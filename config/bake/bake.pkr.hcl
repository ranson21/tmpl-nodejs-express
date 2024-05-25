packer {
  required_plugins {
    docker = {
      source  = "github.com/hashicorp/docker"
      version = "~> 1"
    }
  }
}

locals {
  version    = trimspace(regex_replace(regex("version.*", file("${path.cwd}/package.json")), "(version|\"|:|,)", ""))
  service    = trimspace(regex_replace(regex("name.*", file("${path.cwd}/package.json")), "(name|\"|:|,)", ""))
  repository = var.dkr_reg != "" ? "${var.dkr_reg}/${local.service}" : local.service
}

source "docker" "img" {
  commit    = true
  pull      = true
  image     = var.base_img
  exec_user = var.base_img_user
  changes = [
    "ENTRYPOINT ${var.entrypoint}"
  ]
  run_command = [
    "-d",
    "-i",
    "-t",
    "--entrypoint=/bin/sh",
    "--",
    "{{.Image}}",
  ]
}

build {
  sources = [
    "source.docker.img"
  ]

  # Install deps
  provisioner "shell" {
    inline = [
      "apk update",
      "apk add curl bash make git"
    ]
  }

  # Copy repo instal img-builder container
  provisioner "file" {
    source      = "${var.target_path}/"
    destination = "${var.work_dir}/"
  }

  # Common for all serve builds
  provisioner "shell" {
    inline = [
      "git config --global --add safe.directory /home/svc",
      "cd ${var.work_dir}",
      "make build",
      "cp ${var.work_dir}/build/* /home/svc",
      "cp /home/svc/config/bake/entrypoint.sh /"
    ]
  }

  # Optional seeders
  // provisioner "shell" {
  //   inline = [
  //     "cd ${var.work_dir}",
  //     "if [ ${var run_seed} == 'true' ]; then make seed; fi"
  //   ]
  // }

  post-processors {
    post-processor "docker-tag" {
      repository = local.repository
      tags = [
        local.version,
        "latest"
      ]
    }

    // post-processor "docker-push" {
    //   login          = true
    //   login_username = var.dkr_user
    //   login_password = var.dkr_pass
    //   login_server   = "https://${var.dkr_reg}"
    // }
  }
}
