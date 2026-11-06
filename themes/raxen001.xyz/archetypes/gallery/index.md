+++
draft = true
title = "{{ .File.ContentBaseName | replaceRE `^\d{4}-\d{2}-\d{2}-` "" | replaceRE "[-_]" " " | title }}"
date = {{ .Date }}
+++
