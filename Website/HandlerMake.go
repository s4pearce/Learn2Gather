package Website

import (
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"net/http"
	"github.com/SommerEngineering/Ocean/Templates"
)

// *** 
// Handler that sends the user to the html form for making a group
// ***
func HandlerMake(response http.ResponseWriter, request *http.Request) {
	// Log the request:
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameREQUEST, `Someone has requested the make handler.`, request.RemoteAddr)
	
	// Write the website:
	Templates.ProcessHTML("MakeAGroup",response,nil)
}
