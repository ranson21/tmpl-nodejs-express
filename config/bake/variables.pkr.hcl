variable "target_path" {
  type    = string
  default = "./"
}

variable "work_dir" {
  type    = string
  default = "/home/svc"
}

variable "entrypoint" {
  type    = string
  default = "/entrypoint.sh"
}

variable "base_img" {
  type    = string
  default = "node:16.14.2-alpine"
}

variable "dkr_reg" {
  type    = string
  default = ""
}

variable "dkr_user" {
  type    = string
  default = env("DKR_USER")
}

variable "dkr_pass" {
  type    = string
  default = env("DKR_PASS")
}

variable "base_img_user" {
  type    = string
  default = "root"
}

variable "run_seed" {
  type    = bool
  default = false
}