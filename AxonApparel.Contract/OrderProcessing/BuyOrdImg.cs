using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class BuyOrdImg
    {
        public int Imgno { get; set; }
        public string Order_no { get; set; }
        public int StyleRowid { get; set; }
        public string Imgpath { get; set; }
        public string Imgdesc { get; set; }
        public string Imgtitle { get; set; }
        public string Flag { get; set; }

        public string FilePath { get; set; }
        public long FileID { get; set; }
        public string FileName { get; set; }
        public List<BuyOrdImg> OrdMesImg { get; set; }

    }
}
