function TESTDRIVE_ISA(){
	showDebug = true;
	showMessage= true;
	if (appMatch("Enforcement/Incident/Abatement/Graffiti")  && inspType == "Initial Investigation") {
		scheduleInspectDate("Initial Investigation",dateAdd(null,1,true),"TESTDRIVE");
		}
}