#!/bin/bash

# Find the highest numbered blog post
latest=$(ls -r content/blog/blog* | grep -oE '[0-9]+' | sort -n | tail -1)

# Calculate the next blog number
next=$((latest + 1))

# Create a new blog post using the archetype template
hugo new blog/blog-$next.md
nvim ./content/blog/blog-$next.md
