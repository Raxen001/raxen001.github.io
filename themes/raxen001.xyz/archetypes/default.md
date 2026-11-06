+++
draft = true
title = "{{ replace .File.ContentBaseName "-" " " | replaceRE "_" " " | title }}"
date = {{ .Date }}
description = ""
+++
