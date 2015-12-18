// ***
// NOT COMPLETE. Cannot be done until user state is finished.
// What it will do:
// User will request a study group via the ID. We must go in, check to see that the number of memebers is < group limit, and if so add them to the members list.
// ***

package Website

import (
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"github.com/SommerEngineering/Ocean/Templates"
	"net/http"
)

// This HTTP handler provides a question by using a HTML template.
func HandlerAddMember(response http.ResponseWriter, request *http.Request) {
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameREQUEST, `Someone has requested the question handler.`, request.RemoteAddr)

	// This is the data object for the HTML template:
	// templateData := WebQuestion{}



	// Try to execute the template with the data.
	// The result gets sended to the client i.e. browser:
	Templates.ProcessHTML("JoinGroup", response, nil)
}
