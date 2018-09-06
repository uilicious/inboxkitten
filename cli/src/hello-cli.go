package main

import (
	"flag"
	"fmt"
	"os"
)


//
// Most the CLI example is taken from
//
// https://gobyexample.com/command-line-arguments
// https://gobyexample.com/command-line-flags
// https://blog.rapid7.com/2016/08/04/build-a-simple-cli-tool-with-golang/
//
func main() {
	var image string 
	image := flag.String("image", "", "Docker image")
	flag.Parse()
	 
	if len(image) == 0 {
		fmt.Fprintf(os.Stderr, "You must specify a Docker image name")
	}

	fmt.Printf("Your Docker image was: %s", image)
	fmt.Printf("\n")
}