using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class FinYear
    {
        //Finyear
        public int Finyear { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string YearCode { get; set; }
        public string Period { get; set; }
        public string Posted { get; set; }
        public string Reposted { get; set; }
        public string DBName { get; set; }
        public string Created { get; set; }
        public string SetDefault { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string FinType { get; set; }
        //Company
        public string Prefix { get; set; }
    }
}
