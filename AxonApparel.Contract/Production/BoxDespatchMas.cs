using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BoxDespatchMas : BoxDespatchDet
    {
        public int DespatchId { get; set; }
        public int Companyid { get; set; }
        public string Company { get; set; }
        public string DespatchNo { get; set; }
        public DateTime DespatchDate { get; set; }
        public int CreatedBy { get; set; }
        public List<BoxDespatchDet> stockreqdetail { get; set; }
        public List<BoxDespatchStock> itmstkdetail { get; set; }
    }
}
