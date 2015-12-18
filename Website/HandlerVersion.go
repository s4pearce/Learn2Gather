package Website

import (
	"fmt"
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"net/http"
)

// This HTTP handler prints the current versions and logs the request.
func HandlerVersion(response http.ResponseWriter, request *http.Request) {
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameREQUEST, `Someone has requested the version.`, request.RemoteAddr)
	fmt.Fprintf(response, "%s\n", version)
}
