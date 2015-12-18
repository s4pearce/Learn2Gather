package Website

import (
	"github.com/SommerEngineering/Ocean/CustomerDB"
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"github.com/SommerEngineering/Ocean/Templates"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

// This HTTP handler provides all answers by using a HTML template.
func HandlerUserList(response http.ResponseWriter, request *http.Request) {
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameREQUEST, `Someone has requested the answers.`, request.RemoteAddr)

	// This is the data object for the HTML template:
	templateData := viewGroups{}

	// Get the customer database:
	dbSession, db := CustomerDB.DB()

	// After we are done, close the connection:
	defer dbSession.Close()

	// Any issues?
	if db == nil {
		Log.LogFull(senderName, LM.CategoryAPP, LM.LevelERROR, LM.SeverityCritical, LM.ImpactCritical, LM.MessageNameDATABASE, `Was not able to get the customer database.`)
		return
	}

	// The collection for the groups:
	collUsers := db.C(`userList`)

	// Select the necessary documents in the database.
	// In this case, we want all documents!
	//
	// Syntax for database queries, see http://gopkg.in/mgo.v2
	//
	selection := bson.D{}

	if errFind := collUsers.Find(selection).All(&templateData.Groups); errFind != nil {
		Log.LogFull(senderName, LM.CategorySYSTEM, LM.LevelERROR, LM.SeverityUnknown, LM.ImpactUnknown, LM.MessageNameDATABASE, `Was not able to read all answers out of the database.`, `Error while find.`, errFind.Error())
	}

	// Try to execute the template with the data.
	// The result gets sended to the client i.e. browser:
	Templates.ProcessHTML(`ViewUsers`, response, templateData)
}
