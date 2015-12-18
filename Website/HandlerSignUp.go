package Website

import (
	// "github.com/SommerEngineering/Ocean/Log"
	// LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"github.com/SommerEngineering/Ocean/Templates"
	"net/http"
)

func HandlerSignUp(response http.ResponseWriter, request *http.Request) {
	// Pull up the HTML file to the user
	Templates.ProcessHTML("signup", response, nil)
	
	
}