package main

import (
	"github.com/SommerEngineering/Ocean/CustomerDB"
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
)
//
// Initializing the database for the user information and study groups.
//
func initCustomerDB() {
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameINIT, `Start init of customer database.`)
	defer Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameINIT, `Done init of customer database.`)

	// Retrieving Collections
	dbSession, db := CustomerDB.DB()
	defer dbSession.Close()

	// Any issues with the database?
	if db == nil {
		Log.LogFull(senderName, LM.CategoryAPP, LM.LevelERROR, LM.SeverityCritical, LM.ImpactCritical, LM.MessageNameDATABASE, `Was not able to get the customer database.`)
		return
	}

	//
	// Get all collections:
	//
	collGroups := db.C(`viewGroups`)	//	Grabbing the collection of Study Groups
	collUsers := db.C(`userList`)		//	Grabbing the collection of User Accounts

	//
	// Ensure the indexes:
	// 
	collGroups.EnsureIndexKey(`viewGroups`)
	collUsers.EnsureIndexKey(`userList`)
}
