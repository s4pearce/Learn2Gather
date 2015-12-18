package Website

import (
	// "github.com/SommerEngineering/Ocean/Log"
	// LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"github.com/SommerEngineering/Ocean/Templates"
	"net/http"
	"github.com/gorilla/mux"
    "github.com/gorilla/securecookie"
)

func HandlerLogOut(response http.ResponseWriter, request *http.Request) {
	
	clearSession(response)
    http.Redirect(response, request, "/", 302)
	
	Templates.ProcessHTML("index", response, nil)
}

func clearSession(response http.ResponseWriter) {
    cookie := &http.Cookie{
        Name:   "session",
        Value:  "",
        Path:   "/",
        MaxAge: -1,
    }
    http.SetCookie(response, cookie)
}