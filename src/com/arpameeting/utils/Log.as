package com.arpameeting.utils
{
    public class Log
    {
        static public var tag:String = "default";
        static public function d(message:String):void
        {
            trace("[" + tag + "] " + message);
        }
    }
}