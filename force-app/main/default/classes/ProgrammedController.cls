public with sharing class ProgrammedController {
    @AuraEnabled(cacheable=true)
    public static List<ProgrammedMovie__c> getItems() {
        return [SELECT Room__r.Name__c, Room__r.Seats__c, Movie__r.Title__c, Date__c, ListSeatsTaken__c 
                FROM ProgrammedMovie__c];
    }
}
