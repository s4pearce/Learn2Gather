package Website

import (
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"github.com/SommerEngineering/Ocean/Templates"
	"net/http"
	"github.com/gorilla/mux"
    "github.com/gorilla/securecookie"
)

// ***
// To do: Users may log in. If they send in the user name, we need to assign the username and password and send it to the LogIn handler
// Declaring variables later for when users log in 
// ***
var (
	username string
	password string
)
	
// This HTTP handler prints the current motto and logs the request.
func HandlerHome(response http.ResponseWriter, request *http.Request) {
	// Log the request:
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameREQUEST, `Someone has requested the home.`, request.RemoteAddr)
	
	// Grab website:
	Templates.ProcessHTML("index",response,nil)
	
	
}
