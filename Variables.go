package main

import (
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
)

var (
	// The sender name for this package, for the distributed logging service.
	// Each component / package should use his own sender name. Thus, it is
	// convenient to analyse the log book.
	senderName LM.Sender = `MyAppName`
)
