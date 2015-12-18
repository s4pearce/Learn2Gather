package Website

import (
	// "github.com/SommerEngineering/Ocean/Log"
	// LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"github.com/SommerEngineering/Ocean/Templates"
	"net/http"
	"github.com/gorilla/mux"
    "github.com/gorilla/securecookie"
)

func HandlerLogIn(response http.ResponseWriter, request *http.Request) {
	
	name := request.FormValue("name")
    pass := request.FormValue("password")
    redirectTarget := "/"
    if name != "" && pass != "" {
       // .. check credentials ..
         setSession(name, response)
         redirectTarget = "/internal"
    }
    http.Redirect(response, request, redirectTarget, 302)
	
	// Pull up the HTML file to the user
	// Templates.ProcessHTML("login", response, nil) 
}

// Defining function to set a new session
func setSession(userName string, response http.ResponseWriter) {
    value := map[string]string{
        "name": userName,
    }
    if encoded, err := cookieHandler.Encode("session", value); err == nil {
        cookie := &http.Cookie{
            Name:  "session",
            Value: encoded,
            Path:  "/",
        }
        http.SetCookie(response, cookie)
    }
}