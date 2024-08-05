using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class PrecostFabDept_Fab
    {
        public int PreCostFabDeptFabmasid { get; set; }
        public int PreCostFabDeptmasid { get; set; }
        public int Fabricid { get; set; }
        public int GreyColorid { get; set; }
        public int FabricColorid { get; set; }
        public string PurchaseType { get; set; }
        public int PrecostFabricmasid { get; set; }
        public string Fabric { get; set; }  
        public string GreyColor { get; set; }    
        public string FabricColor { get; set; }
        public int PreCostFabDeptYarnmasid { get; set; }
        public string Type { get; set; }
        public decimal Rate { get; set; }
        public int Sizeid { get; set; }
        public string Size { get; set; }
        public int FabSlno { get; set; }
        public decimal GSM { get; set; }
        public decimal Target { get; set; }
        public string Approved { get; set; }
    }
}
