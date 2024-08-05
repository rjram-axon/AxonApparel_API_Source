using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessOrderAddScreen
    {
        public int bmasid { get; set; }
        public string refno { get; set; }
        public int jmasid { get; set; }
        public string jobordno { get; set; }
        public string orderno { get; set; }
        public int cmpid { get; set; }
        public string company { get; set; }
        public int cmpunitid { get; set; }
        public string cmpnyunit { get; set; }
        public int buyerid { get; set; }
        public string buyer { get; set; }
        public int suppid { get; set; }
        public string style { get; set; }
        public int jobordprefix { get; set; }
        public DateTime joborddate { get; set; }
        public int processid { get; set; }
        public string process { get; set; }
        public int processorid { get; set; }
        public string processor { get; set; }
        public int productionordid { get; set; }
        public string prodnord { get; set; }
        public DateTime proddate { get; set; }
        public DateTime delidate { get; set; }
        public string type { get; set; }
        public string remarks { get; set; }
        public int styleid { get; set; }
        public string PType { get; set; }
        public string OrdType { get; set; }
        public string Knitloc { get; set; }
        public string Yarnloc { get; set; }
        public string SuProcess { get; set; }
        public int Approved { get; set; }
        public string FinProcess { get; set; }
        public string CheckLoad { get; set; }
        public string CheckClos { get; set; }
        public string ProcessSetup { get; set; }
        public int StoreUnitId { get; set; }
        public string DispatchLocType { get; set; }
        public int DispatchLocId { get; set; }

        public string ProcessorEmail { get; set; }
        public string Vehicleno { get; set; }
    }
}
