function printEnv() {
    //Log All Environmental Variables as  globals
    var params = aa.env.getParamValues();
    var keys =  params.keys();
    var key = null;
    while(keys.hasMoreElements())
    {
        key = keys.nextElement();
        eval("var " + key + " = aa.env.getValue(\"" + key + "\");");
        aa.print(key + " = " + aa.env.getValue(key));
    }
}