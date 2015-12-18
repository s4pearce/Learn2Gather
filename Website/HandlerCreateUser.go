package Website

import (
	"github.com/SommerEngineering/Ocean/CustomerDB"
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"net/http"
	// "strconv"
	"gopkg.in/mgo.v2/bson"
)

// ***
// This handler creates a user to be placed into the database
// ***
func HandlerCreateUser(response http.ResponseWriter, request *http.Request) {
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameREQUEST, `Someone has requested the store handler.`, request.RemoteAddr)
	
	// Read the send answer from the client:
	Username := request.FormValue(`Username`)
	
	// ***
	// To add: Check that the username is not already in the collection!
	// ***
	
	Password := request.FormValue(`Password`)
	FirstName := request.FormValue(`FirstName`)
	LastName := request.FormValue(`LastName`)
	Email := request.FormValue(`Email`)
	GroupsJoined := make([]int, 0)

	// Get the customer database:
	dbSession, db := CustomerDB.DB()

	// After we are done, close the connection:
	defer dbSession.Close()

	// Any issues?
	if db == nil {
		Log.LogFull(senderName, LM.CategoryAPP, LM.LevelERROR, LM.SeverityCritical, LM.ImpactCritical, LM.MessageNameDATABASE, `Was not able to get the customer database.`)
		return
	}

	// The collection for the answers:
	collUsers := db.C(`userList`)

	// Create the data object:
	newUserDB := DBuser{}
	
	newUserDB.Username = Username
	newUserDB.Password = Password
	newUserDB.FirstName = FirstName
	newUserDB.LastName = LastName
	newUserDB.Email = Email
	newUserDB.GroupsJoined = GroupsJoined

	// Insert the object in the database:
	collUsers.Insert(newUserDB)

	// Redirect the client to the answers page:
	defer http.Redirect(response, request, "/home", 302) //later have it redirect to user settings page
}
