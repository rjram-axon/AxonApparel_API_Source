using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public class BulkOrderAmendBusiness:IBulkOrderAmendBusiness
    {
       private IBulkOrderAmendRepository strrep = new BulkOrderAmendRepository();

        public Response<bool> UpdateBuyOrderAmendStyle(BuyOrderStyle BulOrd)
        {

            //ComboSize Begin
            var ComboSizeList = new List<Repository.Combosize>();

            if (BulOrd.ComboSize.Count > 0)
            {
                foreach (var item in BulOrd.ComboSize)
                {
                    ComboSizeList.Add(new Repository.Combosize
                    {
                        StyleRowId = BulOrd.StyleRowid,
                        ComboSizeSeq = item.ComboSizeSeq,
                        SizeId = item.SizeId,
                        Sizerow = item.Sizerow,
                    });
                }
            }

            //var result = strrep.AddSizeDetData(ComboSizeList, "Update");
            //ComboSize End

            //ComboColor Begin
            var CombocolorList = new List<Repository.ComboColor>();

            if (BulOrd.ComboColor.Count > 0)
            {
                foreach (var item in BulOrd.ComboColor)
                {
                    CombocolorList.Add(new Repository.ComboColor
                    {
                        CombocolorId = item.CombocolorId,
                        StyleRowId = BulOrd.StyleRowid,
                        Comboid = item.ComboId,
                        Colorid = item.ColorId,
                        ColorRatio = item.ColorRatio,
                        ComboPer = item.ComboPer,
                        ComboQty = item.ComboQty,
                        ComboSeq = item.ComboSeq,
                        ColorSeq = item.ColorSeq,
                        Itemid = item.ItemId,
                    });
                }
            }

            //var Combocolorresult = strrep.AddColorDetData(CombocolorList, "Update");
            //ComboColor End

            //ComboItem Start
            var ComboColorItemList = new List<Repository.ComboItem>();

            foreach (var comboitem in BulOrd.ComboStyleItem)
            {
                ComboColorItemList.Add(new Repository.ComboItem
                {
                    StyleRowId = BulOrd.StyleRowid,
                    ComboColorId = comboitem.ComboColorId,
                    Itemseq = comboitem.Itemseq,
                    ItemID = comboitem.ItemID,
                    ItemRatio = comboitem.ItemRatio,
                });
            }

            //var ColorItemresult = strrep.AddItemDetData(ComboColorItemList, "Update");
            //ComboItem End

            //ComboItem_Composition Start
            var ComboColorItemCompositionList = new List<Repository.Comboitem_Composition>();
            if (BulOrd.ComboItemComposition != null)
            {
                foreach (var itemcomp in BulOrd.ComboItemComposition)
                {
                    ComboColorItemCompositionList.Add(new Repository.Comboitem_Composition
                    {
                        StyleRowId = BulOrd.StyleRowid,
                        ComboitemRowId = itemcomp.ComboItemRowId,
                        ColorSeq = itemcomp.ColorSeq,
                        ColorId = itemcomp.ColorID,
                    });
                }
            }
            //var ColorItemYarnresult = strrep.AddItemCompsitionDetData(ComboColorItemCompositionList, "Update");
            //ComboItem_Composition End

            var Imgdet = new List<Repository.Buy_Ord_Img>();
            if (BulOrd.Buyordimg != null)
            {
                foreach (var img in BulOrd.Buyordimg)
                {
                    Imgdet.Add(new Repository.Buy_Ord_Img
                    {
                        Imgpath = img.Imgpath,
                        Imgtitle = img.Imgtitle,
                        Order_no = img.Order_no,
                        // StyleRowid = img.StyleRowid
                    });
                }
            }

            var res = strrep.UpdateData(new Repository.buy_ord_style
            {
                StyleRowid = BulOrd.StyleRowid,
                order_no = BulOrd.order_no,
                Enquiryid = BulOrd.Enquiryid,
                Styleid = BulOrd.Styleid,
                quantity = BulOrd.quantity,
                price = (decimal)BulOrd.price,
                value = (decimal)BulOrd.value,
                ProductionQty = (decimal)BulOrd.quantity,
                SeasonId = BulOrd.SeasonId,
                styleentdate = BulOrd.styleentdate,
                job_qty = 0,
                cost_estimated = true,
                cutG_Amend = "N",
                Grouped_StyleID = 0,
                Despatch_Closed = "N",
                Grouped = true,
                OpenPrgAmend = "N",
                mis_tmArchive = 0,
                mis_type = 0,
                CAD_Percentage = BulOrd.CADPercentage,
                CAD_Weight = BulOrd.CADWeight,
                CurrencyId = BulOrd.CurrencyId,
                Exchange = BulOrd.ExRate,
                Combosize = ComboSizeList,
                ComboColor = CombocolorList,
                ComboItem = ComboColorItemList,
                Comboitem_Composition = ComboColorItemCompositionList,
                Buy_Ord_Img = Imgdet,
                PA = BulOrd.PA,
                Description = BulOrd.Description
            });
            
            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        }
    }
}
