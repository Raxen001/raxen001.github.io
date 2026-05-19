---
title: "Asseto Corsa Linux Fix 2026 - if PROTON GE 9-20 doesn't work"
date: 2026-05-19T13:16:29+05:30
author: "Raxen"
draft: false
tags: ['asseto-corsa']
categories: ['linux']
customcss: ""
---

# Asseto Corsa Linux Fix 2026 - if PROTON GE 9-20 doesn't work

- Remove proton prefix
- Use Proton GE 9-20 to generate the prefix and files.
- Switched to proton 9.04

Then run this

```bash
protontricks 244210 -q vcrun2019
protontricks 244210 -q dotnet48
protontricks 244210 -q d3dcompiler_43 d3dx11_43
```

Then ran the script [https://github.com/sihawido/assettocorsa-linux-setup](https://github.com/sihawido/assettocorsa-linux-setup)
also add `WINEDLLOVERRIDES="dwrite=n,b"` 
to the launch option.
It is working now even shutokorevivalproject

Tested proton version upto **Proton 10.04**
