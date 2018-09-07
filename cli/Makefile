# Change this to your respective main file
mainfile="inboxkitten.go"
outfile="inboxkitten"

# The go build command
dependencies:
	./go.sh get ./src/...

build:
	mkdir -p bin
	./go.sh build -o "bin/$(outfile)" "src/$(mainfile)" 

clean:
	rm -fr ./bin/*
	./go.sh clean
