package Website

import (
	"fmt"
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"net/http"
)

// This is another TEST handler.
func HandlerTEST(response http.ResponseWriter, request *http.Request) {
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameREQUEST, `Someone has requested the test.`, request.RemoteAddr)
	fmt.Fprintf(response, "Really, this is just another test.\n")
}
