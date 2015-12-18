package main

import (
	"Learn2Gather/Website"
	"github.com/SommerEngineering/Ocean/Handlers"
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"github.com/gorilla/mux"
    "github.com/gorilla/securecookie"
)

var cookieHandler = securecookie.New(		// Preparing the handler for the cookie
    securecookie.GenerateRandomKey(64),
    securecookie.GenerateRandomKey(32))

// Register all HTTP handlers for my app.
func registerHandlers() {
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameSTARTUP, `Register now all app handlers.`)
	defer Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameSTARTUP, `Register now all app handlers done.`)

	// Public Handlers: Public reachable
	Handlers.AddPublicHandler(`/`, Website.HandlerHome)
	Handlers.AddPublicHandler(`/appVersion`, Website.HandlerVersion)
	Handlers.AddPublicHandler(`/add`, Website.HandlerAddMember) 			// Future User Handler
	Handlers.AddPublicHandler(`/store`, Website.HandlerStore2Database) 		// Internal Function
	Handlers.AddPublicHandler(`/view`, Website.HandlerView) 
	Handlers.AddPublicHandler(`/about`, Website.HandlerAbout)
	Handlers.AddPublicHandler(`/makeagroup`, Website.HandlerMake) 			// Future User Handler 				
	Handlers.AddPublicHandler(`/signup`, Website.HandlerSignUp)		
	Handlers.AddPublicHandler(`/create`, Website.HandlerCreateUser)
	
	Handlers.AddPublicHandler(`/login`, Website.HandlerLogIn).Methods("POST")	// Handlers for user state, only allow them to send post requests
	Handlers.AddPublicHandler(`/logout`, Website.HandlerLogOut).Methods("POST")

	// Admin Handlers: Reachable only on the local device or by using e.g. SSH tunnels
	Handlers.AddAdminHandler(`/appVersion`, Website.HandlerVersion)
	Handlers.AddAdminHandler(`/test`, Website.HandlerTEST)
	Handlers.AddAdminHandler(`/userlist`, Website.HandlerUserList)			
}
