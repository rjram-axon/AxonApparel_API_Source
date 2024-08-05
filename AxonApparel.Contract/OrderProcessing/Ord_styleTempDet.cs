using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class Ord_styleTempDet
    {
        public int DGItemId { get; set; }
        public int DBuyerId { get; set; }
        public string DBuyerName { get; set; }
        public string DGItem { get; set; }
        public string DSupplierName { get; set; }
        public string DItem { get; set; }
        public string DColor { get; set; }
        public int DGColorId { get; set; }
        public string DGColor { get; set; }
        public string DGSize { get; set; }
        public int DGSizeId { get; set; }
        public string DSize { get; set; }
        public int DSno { get; set; }
        public string DTemplate { get; set; }
        public int DTempDetId { get; set; }
        public int DTemplateId { get; set; }
        public int DItemId { get; set; }
        public int DColorId { get; set; }
        public int DSizeId { get; set; }
        public int DSupplierId { get; set; }
        public int DConvertTypeId { get; set; }
        public string DConvertTypeName { get; set; }
        public decimal DQty { get; set; }
        public decimal DRate { get; set; }
        public string DTypeval { get; set; }
        public int CheckOrdTemp { get; set; }
        //public Nullable<int> DGColorid { get; set; }
        //public Nullable<int> DGSizeid { get; set; }

    }
}
