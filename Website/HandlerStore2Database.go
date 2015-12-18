package Website

import (
	"github.com/SommerEngineering/Ocean/CustomerDB"
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"net/http"
	"strconv"
	"gopkg.in/mgo.v2/bson"
)
// ***
// This handler stores the new study group to the database.
// ***
func HandlerStore2Database(response http.ResponseWriter, request *http.Request) {
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameREQUEST, `Someone has requested the store handler.`, request.RemoteAddr)
	
	// Read the send answer from the client:
	GroupName := request.FormValue(`GroupName`)
	Course := request.FormValue(`Course`)
	Members := request.FormValue(`Members`)
	Location := request.FormValue(`Location`)
	Time := request.FormValue(`Time`)
	Date := request.FormValue(`Date`)
	GroupLimit := request.FormValue("Limit")
	Topics := request.FormValue(`Topics`)
	Weekly := request.FormValue(`Weekly`)
	Comments := request.FormValue(`Comment`)
	Until := ""
	
	if Weekly == "1" {
		Until = request.FormValue(`Until`)
	} else {
		Until = Weekly
	}

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
	collGroups := db.C(`viewGroups`)

	// Create the data object:
	groupDB := DBstudyGroup{}
	
	groupDB.ID = bson.NewObjectId()
	groupDB.GroupName = GroupName
	groupDB.Subject = Course
	groupDB.Members = Members
	groupDB.Location = Location
	groupDB.Time = Time
	groupDB.Date = Date
	groupDB.GroupLimit, _ = strconv.Atoi(GroupLimit)
	groupDB.TopicsCovered = Topics
	if Weekly == "1" {
		groupDB.Weekly = true
	} else {
		groupDB.Weekly = false
	}
	groupDB.EndDate  = Until
	groupDB.Comments = Comments

	// Insert the object in the database:
	collGroups.Insert(groupDB)

	// Redirect the client to the answers page:
	defer http.Redirect(response, request, "/view", 302)
}
