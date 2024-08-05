using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class PrecostingFabric_det
    {
        public int PrecostFabricmasid { get; set; }
        public int PrecostFabTrimmasid { get; set; }
        public int GItemid { get; set; }
        public string GItem { get; set; }
        public int Componentid { get; set; }
        public string Component { get; set; }
        public int Fabricid { get; set; }
        public string Fabric { get; set; }
        public int Greycolorid { get; set; }
        public string Greycolor { get; set; }
        public int Finishcolorid { get; set; }
        public string Finishcolor { get; set; }
        public int Printcolorid { get; set; }
        public string Printcolor { get; set; }
        public decimal GSM { get; set; }
        public decimal Grammage { get; set; }
    }
}
