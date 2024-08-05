using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class OrdCons_Mas
    {
        public int ordconsmasid { get; set; }
        public decimal ordconsavggramage { get; set; }
        public int GarmentItemid { get; set; }
        public int BmasId { get; set; }
        public int StyleRowId { get; set; }
        public List<OrdCons_ProcSeq> ordProcessDet { get; set; }
        public List<OrdCons_YarnFab> ordItemDet { get; set; }
    }
}
