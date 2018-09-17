package main

//---------------------------------------------------------------------------------------
//
// Dependencies import
//
//---------------------------------------------------------------------------------------

import (
	"flag"
	"fmt"
	"os"
	"io/ioutil"
	"net/http"
	"time"
	"log"
	"bytes"
	"encoding/json"
	// "github.com/hokaccha/go-prettyjson"
)

//---------------------------------------------------------------------------------------
//
// Utility functions
//
//---------------------------------------------------------------------------------------

func jsonPrettifier( raw string ) string {
	buf := new(bytes.Buffer)
	json.Indent(buf, []byte(raw), "", "  ")
	return buf.String()
}

//---------------------------------------------------------------------------------------
//
// Http Request functions
//
//---------------------------------------------------------------------------------------

func doGetRequest( url string ) []byte {
	client := http.Client{
		Timeout: time.Second * 2,
	};

	req, err := http.NewRequest(http.MethodGet, url, nil);
	if err != nil {
		log.Fatal(err);
	}

	res, getErr := client.Do(req);
	if getErr != nil {
		log.Fatal(getErr);
	}
	
	body, readErr := ioutil.ReadAll(res.Body);
	if readErr != nil {
		log.Fatal(readErr);
	}

	return body;
}

//---------------------------------------------------------------------------------------
//
// Main CLI functions
//
// Note most of the CLI coding was done with referencing to :
//
// https://gobyexample.com/command-line-arguments
// https://gobyexample.com/command-line-flags
// https://blog.rapid7.com/2016/08/04/build-a-simple-cli-tool-with-golang/
//
//---------------------------------------------------------------------------------------

//
// Main CLI
//
func main() {

	// The api url with default value
	var apiDefault = "https://us-central1-ulicious-inbox-kitten.cloudfunctions.net/api-v1"
	var api string
	flag.StringVar(&api, "api", apiDefault, "URL to inbox kitten API")

	// Parse all the flags
	flag.Parse();
	
	// Output the api URL if its custom
	if( api != apiDefault ) {
		fmt.Printf("Using Custom API: %s \n", api)
	}

	// Post flag processing args
	var flagArgs = flag.Args();

	// Verify that a subcommand has been provided
	// flagArgs[0] is the main command
	// flagArgs[1] will be the subcommand
	var missingCommandError = "`list [email]` or `get [emailid]` subcommand is required\n";
	if len(flagArgs) <= 0 {
		fmt.Fprintf(os.Stderr, missingCommandError);
		flag.PrintDefaults();
		os.Exit(1);
	}

	// The list and get command
	getCommand := flag.NewFlagSet("get", flag.ExitOnError)
	listCommand := flag.NewFlagSet("list", flag.ExitOnError)

	// Switch on the subcommand
	// Parse the flags for appropriate FlagSet
	// FlagSet.Parse() requires a set of arguments to parse as input
	// flagArgs[2:] will be all arguments starting after the subcommand at flagArgs[1]
	switch flagArgs[0] {
		case "list":
			listCommand.Parse(flagArgs[1:])
		case "get":
			getCommand.Parse(flagArgs[1:])
		default:
			fmt.Fprintf(os.Stderr, missingCommandError);
			flag.PrintDefaults();
			os.Exit(1);
	}

	//
	// Processing of LIST command
	//
	if listCommand.Parsed() {
		var listArgs = listCommand.Args();
		if len(listArgs) <= 0 {
			fmt.Fprintf(os.Stderr, "`list [email]` missing email parameter\n");
			os.Exit(1);
		}

		var email = listArgs[0];
		
		var urlWithParams = api+"/mail/list?recipient="+email
		var body = doGetRequest(urlWithParams);
		fmt.Println( jsonPrettifier( string(body) ) );
	}

	//
	// Processing of GET command
	//
	if getCommand.Parsed() {
		var getArgs = getCommand.Args();
		if len(getArgs) <= 1 {
			fmt.Fprintf(os.Stderr, "`get [region] [key]` missing region and key parameter\n");
			os.Exit(1);
		}

		var region = getArgs[0];
		var key = getArgs[1];

		var urlWithParams = api+"/mail/getKey?mailKey="+region+"-"+key;
		var body = doGetRequest(urlWithParams);

		fmt.Println( jsonPrettifier( string(body) ) );
	}
}

