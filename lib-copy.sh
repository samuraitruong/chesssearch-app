#!/bin/bash

# Define source and destination directories
source_dir="node_modules/stockfish/src"
destination_dir="./public/sf"

# Copy files with specified extensions
cp "$source_dir"/*.js "$destination_dir"
cp "$source_dir"/*.wasm "$destination_dir"
cp "$source_dir"/*.nnue "$destination_dir"
