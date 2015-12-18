package Website

import (
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"net/http"
	"github.com/SommerEngineering/Ocean/Templates"
)
// ***
// This HTTP handler brings up the "about" html file.
// The "about" section explains what the application does to the user
// ***
func HandlerAbout(response http.ResponseWriter, request *http.Request) {
	// Log the request:
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameREQUEST, `Someone has requested the home.`, request.RemoteAddr)
	
	// Write the website:
	Templates.ProcessHTML("about",response,nil)
}
