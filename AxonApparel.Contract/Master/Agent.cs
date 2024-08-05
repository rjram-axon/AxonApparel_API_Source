using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Agent
    {
        public int AgentId { get; set; }
        public string AgentName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int CityId { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string CityName { get; set; }
        public string Zipcode { get; set; }
        public string Phone { get; set; }
        public string ContactName { get; set; }
        public decimal MobNo { get; set; }
        public string Type { get; set; }
        public string IsActive { get; set; }
        public int CountAgentId { get; set; }
        public List<ListItem> CityList { get; set; }
        public List<ListItem> AgentTypeList { get; set; }
    }
}