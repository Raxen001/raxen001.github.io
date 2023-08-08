#!/bin/bash

# Find the highest numbered blog post
latest=$(ls -r content/personal_writing/write* | grep -oE '[0-9]+' | sort -n | tail -1)

# Calculate the next blog number
next=$((latest + 1))

# Create a new blog post using the archetype template
hugo new personal_writing/write-$next.md

nvim content/personal_writing/write-$next.md
