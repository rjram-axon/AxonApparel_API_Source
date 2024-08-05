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
    public class BuyOrdStyleBusiness : IBuyOrderStyleBusiness
    {
        private IBuyOrderStyleRepository strrep = new BuyOrderStyleRepository();

        public Response<IQueryable<Domain.BuyOrderStyle>> GetBuyOrderStyle()
        {
            try
            {
                var couList = strrep.GetDataList();

                return new Response<IQueryable<Domain.BuyOrderStyle>>(couList.Select(m => new Domain.BuyOrderStyle
                {
                    StyleRowid = m.StyleRowid,
                    order_no = m.order_no,
                    Enquiryid = (int)m.Enquiryid,
                    Styleid = m.Styleid,
                    styleName = m.StyleHeader.Style,
                    quantity = (int)m.quantity,
                    SeasonId = (int)m.SeasonId,
                    job_qty = (int)m.job_qty,
                    CurrencyId = (int)m.CurrencyId,
                    ExRate = (decimal)m.Exchange,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.BuyOrderStyle> GetDataById(int StyleRowId, string styletype="")
        {
            try
            {
                var sty = strrep.GetDataById(StyleRowId);
                    
                return new Response<Domain.BuyOrderStyle>(new Domain.BuyOrderStyle
                {
                    StyleRowid = sty.StyleRowid,
                    order_no = sty.order_no,
                    //Ref_No=sty.re
                    Styleid = sty.Styleid,
                    CurrencyId = (int)sty.CurrencyId,
                    ExRate = (decimal)sty.Exchange,
                    //styleentdate=(DateTime)sty.styleentdate,
                    styleentdate = Convert.ToDateTime(sty.styleentdate.Value.Day + "/" + sty.styleentdate.Value.Month + "/" + sty.styleentdate.Value.Year),
                    quantity = (int)sty.quantity,
                    price = (float)(sty.price == null ? 0 : sty.price),
                    value = (int)(sty.value == null ? 0 : sty.value),
                    job_qty = (int)sty.job_qty,
                    LongDesc = (sty.LongDesc == null ? string.Empty : sty.LongDesc),
                    Enquiryid = (int)(sty.Enquiryid == null ? 0 : sty.Enquiryid),
                    SeasonId = (int)(sty.SeasonId == null ? 0 : sty.SeasonId),
                    CADWeight = (decimal)(sty.CAD_Weight == null ? 0 : sty.CAD_Weight),
                    CADPercentage = (decimal)(sty.CAD_Percentage == null ? 0 : sty.CAD_Percentage),
                    BuyerArt = sty.BuyerArt,
                    Description=sty.Description,

                    ComboSize = sty.Combosize.Select(h => new Domain.ComboSize()
                    {
                        CombosizeId = h.CombosizeId,
                        ComboSizeSeq = (int)h.ComboSizeSeq,
                        StyleRowId = (int)h.StyleRowId,
                        SizeId = (int)h.SizeId,
                        SizeName = h.Size.size1,
                        Sizerow = (int)h.Sizerow
                    }).Where(x => x.StyleRowId == StyleRowId).ToList(),

                    ComboColor = sty.ComboColor.Select(h => new Domain.ComboColor()
                    {
                        CombocolorId = h.CombocolorId,
                        ComboSeq = (int)h.ComboSeq,
                        ColorSeq = (int)h.ColorSeq,
                        StyleRowId = (int)h.StyleRowId,
                        ComboId = (int)h.Comboid,
                        ColorRatio = (int)h.ColorRatio,
                        ComboPer = (decimal)h.ComboPer,
                        ItemId = (int)h.Itemid,
                        ItemName = h.Item.Item1,
                        ComboQty = (int)h.ComboQty,
                        ComboName = h.Color1.Color1,
                        ColorName = h.Color.Color1,
                        ColorId = (int)h.Colorid,
                        Flag = h.Flag
                    }).Where(x => x.Flag == "I" && x.StyleRowId == StyleRowId).ToList(),

                    ComboStyleItem = sty.ComboItem.Select(h => new Domain.ComboItem()
                    {
                        ComboitemRowId = h.ComboitemRowId,
                        ItemID = (int)h.ItemID,
                        StyleRowId = (int)h.StyleRowId,
                        ComboColorId = (int)h.ComboColorId,
                        Itemseq = (int)h.Itemseq,
                        ItemName = h.Item.Item1,
                        ItemRatio = (int)h.ItemRatio,
                        Flag = h.Flag
                    }).Where(x => x.Flag == "I" && x.StyleRowId == StyleRowId).ToList(),

                    ComboItemComposition = sty.Comboitem_Composition.Select(h => new Domain.ComboItemComposition()
                    {
                        RowId = h.RowId,
                        ColorName = h.Color.Color1,
                        ComboItemRowId = h.ComboitemRowId,
                        StyleRowId = (int)h.StyleRowId,
                        ColorID = (int)h.ColorId,
                        ColorSeq = (int)h.ColorSeq,
                        Flag = h.Flag,
                        Itemname = "",
                        
                    }).Where(x => x.Flag == "I" && x.StyleRowId == StyleRowId).ToList(),

                    Buyordimg = sty.Buy_Ord_Img.Select(h => new Domain.BuyOrdImg()
                    {
                        FilePath = h.Imgpath,
                        FileID = h.Imgno,
                        FileName = h.Imgdesc,
                    }).ToList(),

                }, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<Domain.BuyOrderStyle>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateBuyOrderStyle(Domain.BuyOrderStyle BuyOrd)
        {
            try
            {

                var ComboSizeList = new List<Repository.Combosize>();

                foreach (var combosize in BuyOrd.ComboSize)
                {
                    ComboSizeList.Add(new Repository.Combosize
                    {
                        SizeId = combosize.SizeId,
                        Sizerow = combosize.Sizerow,
                        ComboSizeSeq = combosize.ComboSizeSeq
                    });
                }

                var ComboColorList = new List<Repository.ComboColor>();

                foreach (var combocolor in BuyOrd.ComboColor)
                {
                    ComboColorList.Add(new Repository.ComboColor
                    {
                        //StyleRowId = BuyOrderId,
                        Comboid = combocolor.ComboId,
                        Colorid = combocolor.ColorId,
                        ColorRatio = combocolor.ColorRatio,
                        ComboPer = combocolor.ComboPer,
                        ComboQty = combocolor.ComboQty,
                        ComboSeq = combocolor.ComboSeq,
                        ColorSeq = combocolor.ColorSeq,
                        Itemid = combocolor.ItemId,
                    });
                }

                var ComboColorItemList = new List<Repository.ComboItem>();

                foreach (var comboitem in BuyOrd.ComboStyleItem)
                {
                    ComboColorItemList.Add(new Repository.ComboItem
                    {
                        //StyleRowId = BuyOrderId,
                        ComboColorId = comboitem.ComboColorId,
                        Itemseq = comboitem.Itemseq,
                        ItemID = comboitem.ItemID,
                        ItemRatio = comboitem.ItemRatio,
                    });
                }

                var ComboColorItemCompositionList = new List<Repository.Comboitem_Composition>();
                if (BuyOrd.ComboItemComposition != null)
                {
                    foreach (var itemcomp in BuyOrd.ComboItemComposition)
                    {
                        ComboColorItemCompositionList.Add(new Repository.Comboitem_Composition
                        {
                            //StyleRowId = BuyOrderId,
                            ComboitemRowId = itemcomp.ComboItemRowId,
                            ColorSeq = itemcomp.ColorSeq,
                            ColorId = itemcomp.ColorID,
                        });
                    }
                }

                var Imgdet = new List<Repository.Buy_Ord_Img>();
                if (BuyOrd.Buyordimg != null)
                {
                    foreach (var img in BuyOrd.Buyordimg)
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

                var BuyOrderId = strrep.AddData(new Repository.buy_ord_style
                {
                    order_no = BuyOrd.order_no,
                    Enquiryid = BuyOrd.Enquiryid,
                    Styleid = BuyOrd.Styleid,
                    quantity = BuyOrd.quantity,
                    price = (decimal)BuyOrd.price,
                    value = (decimal)BuyOrd.value,
                    ProductionQty = (decimal)BuyOrd.quantity,
                    SeasonId = BuyOrd.SeasonId,
                    styleentdate = BuyOrd.styleentdate,
                    job_qty = 0,
                    cost_estimated = true,
                    cutG_Amend = "N",
                    Grouped_StyleID = 0,
                    Grouped = true,
                    OpenPrgAmend = "N",
                    mis_tmArchive = 0,
                    mis_type = 0,
                    CAD_Percentage = BuyOrd.CADPercentage,
                    CAD_Weight = BuyOrd.CADWeight,
                    Despatch_Closed = "N",
                    CurrencyId = BuyOrd.CurrencyId,
                    Exchange = BuyOrd.ExRate,
                    Combosize = ComboSizeList,
                    ComboColor = ComboColorList,
                    ComboItem = ComboColorItemList,
                    Comboitem_Composition = ComboColorItemCompositionList,
                    Buy_Ord_Img = Imgdet,
                    PA=BuyOrd.PA,
                    Description=BuyOrd.Description,
                    BuyerArt = BuyOrd.BuyerArt
                });

                ////ComboSize Start
                //var ComboSizeList = new List<Repository.Combosize>();

                //foreach (var combosize in BuyOrd.ComboSize)
                //{
                //    ComboSizeList.Add(new Repository.Combosize
                //    {                        
                //        StyleRowId = BuyOrderId,
                //        SizeId = combosize.SizeId,
                //        Sizerow = combosize.Sizerow,
                //        ComboSizeSeq=combosize.ComboSizeSeq
                //    });
                //}

                //var Sizeresult = strrep.AddSizeDetData(ComboSizeList, "Add");
                ////ComboSize End

                ////ComboColor Start
                //var ComboColorList = new List<Repository.ComboColor>();

                //foreach (var combocolor in BuyOrd.ComboColor)
                //{
                //    ComboColorList.Add(new Repository.ComboColor
                //    {
                //        StyleRowId = BuyOrderId,
                //        Comboid = combocolor.ComboId,
                //        Colorid = combocolor.ColorId,
                //        ColorRatio = combocolor.ColorRatio,
                //        ComboPer = combocolor.ComboPer,
                //        ComboQty = combocolor.ComboQty,
                //        ComboSeq=combocolor.ComboSeq,
                //        ColorSeq=combocolor.ColorSeq,
                //        Itemid=combocolor.ItemId,                        
                //    });
                //}

                //var Colorresult = strrep.AddColorDetData(ComboColorList, "Add");
                ////ComboColor End

                ////ComboItem Start
                //var ComboColorItemList = new List<Repository.ComboItem>();

                //foreach (var comboitem in BuyOrd.ComboStyleItem)
                //{
                //    ComboColorItemList.Add(new Repository.ComboItem
                //    {                           
                //        StyleRowId = BuyOrderId,
                //        ComboColorId = comboitem.ComboColorId,
                //        Itemseq = comboitem.Itemseq,
                //        ItemID = comboitem.ItemID,
                //        ItemRatio = comboitem.ItemRatio,                        
                //    });
                //}

                //var ColorItemresult = strrep.AddItemDetData(ComboColorItemList, "Add");
                ////ComboItem End

                ////ComboItem_Composition Start
                //var ComboColorItemCompositionList = new List<Repository.Comboitem_Composition>();
                //if (BuyOrd.ComboItemComposition != null)
                //{
                //    foreach (var itemcomp in BuyOrd.ComboItemComposition)
                //    {
                //        ComboColorItemCompositionList.Add(new Repository.Comboitem_Composition
                //        {
                //            StyleRowId = BuyOrderId,
                //            ComboitemRowId = itemcomp.ComboItemRowId,
                //            ColorSeq = itemcomp.Colorseq,
                //            ColorId = itemcomp.ColorID,
                //        });
                //    }
                //}
                //var ColorItemYarnresult = strrep.AddItemCompsitionDetData(ComboColorItemCompositionList, "Add");
                ////ComboItem_Composition End

                if (BuyOrderId)
                {
                    return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
                }
                else
                {
                    return new Response<int>(0, Status.ERROR, "Save Failed");
                }

                //return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateBuyOrderStyle(Domain.BuyOrderStyle StyleUpd)
        {
            //ComboSize Begin
            var ComboSizeList = new List<Repository.Combosize>();

            if (StyleUpd.ComboSize.Count > 0)
            {
                foreach (var item in StyleUpd.ComboSize)
                {
                    ComboSizeList.Add(new Repository.Combosize
                    {
                        StyleRowId = StyleUpd.StyleRowid,
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

            if (StyleUpd.ComboColor.Count > 0)
            {
                foreach (var item in StyleUpd.ComboColor)
                {
                    CombocolorList.Add(new Repository.ComboColor
                    {
                        CombocolorId = item.CombocolorId,
                        StyleRowId = StyleUpd.StyleRowid,
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

            foreach (var comboitem in StyleUpd.ComboStyleItem)
            {
                ComboColorItemList.Add(new Repository.ComboItem
                {
                    StyleRowId = StyleUpd.StyleRowid,
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
            if (StyleUpd.ComboItemComposition != null)
            {
                foreach (var itemcomp in StyleUpd.ComboItemComposition)
                {
                    ComboColorItemCompositionList.Add(new Repository.Comboitem_Composition
                    {
                        StyleRowId = StyleUpd.StyleRowid,
                        ComboitemRowId = itemcomp.ComboItemRowId,
                        ColorSeq = itemcomp.ColorSeq,
                        ColorId = itemcomp.ColorID,
                    });
                }
            }
            //var ColorItemYarnresult = strrep.AddItemCompsitionDetData(ComboColorItemCompositionList, "Update");
            //ComboItem_Composition End

            var Imgdet = new List<Repository.Buy_Ord_Img>();
            if (StyleUpd.Buyordimg != null)
            {
                foreach (var img in StyleUpd.Buyordimg)
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
                StyleRowid = StyleUpd.StyleRowid,
                order_no = StyleUpd.order_no,
                Enquiryid = StyleUpd.Enquiryid,
                Styleid = StyleUpd.Styleid,
                quantity = StyleUpd.quantity,
                price = (decimal)StyleUpd.price,
                value = (decimal)StyleUpd.value,
                ProductionQty = (decimal)StyleUpd.quantity,
                SeasonId = StyleUpd.SeasonId,
                styleentdate = StyleUpd.styleentdate,
                job_qty = 0,
                cost_estimated = true,
                cutG_Amend = "N",
                Grouped_StyleID = 0,
                Despatch_Closed = "N",
                Grouped = true,
                OpenPrgAmend = "N",
                mis_tmArchive = 0,
                mis_type = 0,
                CAD_Percentage = StyleUpd.CADPercentage,
                CAD_Weight = StyleUpd.CADWeight,
                CurrencyId = StyleUpd.CurrencyId,
                Exchange = StyleUpd.ExRate,
                Combosize = ComboSizeList,
                ComboColor = CombocolorList,
                ComboItem = ComboColorItemList,
                Comboitem_Composition = ComboColorItemCompositionList,
                Buy_Ord_Img = Imgdet,
                PA = StyleUpd.PA,
                Description=StyleUpd.Description,
                BuyerArt = StyleUpd.BuyerArt
            });

            ////ComboSize Begin
            //var detailList = new List<Repository.Combosize>();

            //if (StyleUpd.ComboSize.Count > 0)
            //{
            //    foreach (var item in StyleUpd.ComboSize)
            //    {
            //        detailList.Add(new Repository.Combosize
            //        {                        
            //            StyleRowId = StyleUpd.StyleRowid,
            //            ComboSizeSeq = item.ComboSizeSeq,
            //            SizeId = item.SizeId,
            //            Sizerow = item.Sizerow,
            //        });
            //    }
            //}

            //var result = strrep.AddSizeDetData(detailList, "Update");
            ////ComboSize End

            ////ComboColor Begin
            //var CombocolorList = new List<Repository.ComboColor>();

            //if (StyleUpd.ComboColor.Count > 0)
            //{
            //    foreach (var item in StyleUpd.ComboColor)
            //    {
            //        CombocolorList.Add(new Repository.ComboColor
            //        {
            //            CombocolorId=item.CombocolorId,
            //            StyleRowId = StyleUpd.StyleRowid,
            //            Comboid = item.ComboId,
            //            Colorid = item.ColorId,
            //            ColorRatio = item.ColorRatio,
            //            ComboPer = item.ComboPer,
            //            ComboQty = item.ComboQty,
            //            ComboSeq = item.ComboSeq,
            //            ColorSeq = item.ColorSeq,
            //            Itemid = item.ItemId,
            //        });
            //    }
            //}

            //var Combocolorresult = strrep.AddColorDetData(CombocolorList, "Update");
            ////ComboColor End

            ////ComboItem Start
            //var ComboColorItemList = new List<Repository.ComboItem>();

            //foreach (var comboitem in StyleUpd.ComboStyleItem)
            //{
            //    ComboColorItemList.Add(new Repository.ComboItem
            //    {
            //        StyleRowId = StyleUpd.StyleRowid,
            //        ComboColorId = comboitem.ComboColorId,
            //        Itemseq = comboitem.Itemseq,
            //        ItemID = comboitem.ItemID,
            //        ItemRatio = comboitem.ItemRatio,
            //    });
            //}

            //var ColorItemresult = strrep.AddItemDetData(ComboColorItemList, "Update");
            ////ComboItem End

            ////ComboItem_Composition Start
            //var ComboColorItemCompositionList = new List<Repository.Comboitem_Composition>();
            //if (StyleUpd.ComboItemComposition != null)
            //{
            //    foreach (var itemcomp in StyleUpd.ComboItemComposition)
            //    {
            //        ComboColorItemCompositionList.Add(new Repository.Comboitem_Composition
            //        {
            //            StyleRowId = StyleUpd.StyleRowid,
            //            ComboitemRowId = itemcomp.ComboItemRowId,
            //            ColorSeq = itemcomp.ColorSeq,
            //            ColorId = itemcomp.ColorID,
            //        });
            //    }
            //}
            //var ColorItemYarnresult = strrep.AddItemCompsitionDetData(ComboColorItemCompositionList, "Update");
            ////ComboItem_Composition End

            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        }

        public Response<bool> DeleteBuyOrderStyle(int StyleRowId)
        {
            return new Response<bool>(strrep.DeleteData(StyleRowId), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<bool> GetShipmentChecking(int StyleRowId)
        {
            return new Response<bool>(strrep.GetShipmentChecking(StyleRowId), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<IQueryable<Domain.Enquiry>> GetEnquiryNo()
        {
            try
            {
                var strenqlist = strrep.GetEnquiryNo();

                return new Response<IQueryable<Domain.Enquiry>>(strenqlist.Select(m => new Domain.Enquiry
                {
                    EnquiryId = m.EnquiryId,
                    EnquiryNo = m.EnquiryNo,

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Enquiry>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<Domain.BuyOrderStyle> GetOrderRef(int OrderId)
        {
            try
            {
                var strlist = strrep.GetOrderRefNo(OrderId);

                return new Response<Domain.BuyOrderStyle>(new Domain.BuyOrderStyle
                {
                    Ref_No = strlist.Ref_No,
                    quantity = Convert.ToInt64(strlist.Quantity),
                    Buyerid = (int)(strlist.BuyerId == null ? 0 : strlist.BuyerId),
                    BuyerName = strlist.Buyer.Buyer1,
                    order_no = strlist.Order_No,
                    GuomConversion = (int)strlist.Guom_Conv
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<Domain.BuyOrderStyle>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<IQueryable<Domain.Item>> GetItemStylebyId(int StyleId)
        {
            try
            {
                var strlist = strrep.GetItemByStyle(StyleId);

                return new Response<IQueryable<Domain.Item>>(strlist.Select(m => new Domain.Item
                {
                    Itemid = m.ItemId,
                    ItemName = m.Item1,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        //public Response<Domain.BuyOrderStyle> GetOrderQuantity(string OrderNo)
        //{
        //    try
        //    {
        //        var strlist = strrep.GetOrderQuantity(OrderNo);

        //        return new Response<Domain.BuyOrderStyle>(new Domain.BuyOrderStyle
        //        {
        //            quantity = (decimal)strlist.Quantity
        //        }, Status.SUCCESS, "Fetched Successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<Domain.BuyOrderStyle>(null, Status.ERROR, "OOPS error occured. Please try again later");
        //    }
        //}

        
        public Response<IQueryable<BuyOrderStyle>> GetBuyOrderStyleLoad(int buyormasid)
        {
            try
            {
                var CurDetList = strrep.GetDataRepList(buyormasid);

                return new Response<IQueryable<BuyOrderStyle>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<BuyOrderStyle>> GetBuyOrderTargetStyleLoad(string buyormasid)
        {
            try
            {
                var CurDetList = strrep.GetTargetDataRepList(buyormasid);

                return new Response<IQueryable<BuyOrderStyle>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<BuyOrderStyle>> GetOrderno(int BMasId)
        {
            try
            {
                var couList = strrep.GetOrderno(BMasId);

                return new Response<IQueryable<Domain.BuyOrderStyle>>(couList.Select(m => new Domain.BuyOrderStyle
                {

                    order_no = m.order_no,
                    quantity = (int)m.quantity,
                    buyormasid = m.buyormasid

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<BuyOrderStyle>> GetDataCheckShipPlanDetails(string OrdNo,int Styleid)
        {            
            try
            {
                var ProdutWO = strrep.GetDataRepCheckShipPlanDetails(OrdNo, Styleid);

                return new Response<IQueryable<BuyOrderStyle>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<BuyOrderStyle>> GetStylerowidDetails(string OrdNo, int Styleid)
        {
            try
            {
                var ProdutWO = strrep.GetStylerowidDetails(OrdNo, Styleid);

                return new Response<IQueryable<BuyOrderStyle>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<BuyOrderStyle> GetDataCheckStyle(int Styleid, string OrdNo)
        {
            try
            {
                var buo = strrep.CheckRepStyle(Styleid, OrdNo);


                return new Response<Domain.BuyOrderStyle>(new Domain.BuyOrderStyle
                {

                    order_no = buo.order_no,
                    Styleid = buo.Styleid,
                    StyleRowid=buo.StyleRowid,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.BuyOrderStyle>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Style> GetStyleItemInfo(int Styleid)
        {
            try
            {
                var buo = strrep.StyleHeaderInfo(Styleid);
                
                return new Response<Domain.Style>(new Domain.Style
                {
                    itemid=(int)buo.Itemid,
                    StyleId = buo.StyleId,

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Style>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.Style>> GetStyleNo(string orderno)
        {
            try
            {
                var CurDetList = strrep.GetStyleNo(orderno);

                return new Response<IQueryable<Domain.Style>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Style>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<IQueryable<Domain.BuyOrdImg>> GetStlyeImglist()
        {
            try
            {
                var CurDetList = strrep.GetStlyeImglist();

                return new Response<IQueryable<Domain.BuyOrdImg>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.BuyOrdImg>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.BuyOrdImg>> GetStlyeImgdet(string Style, string Orderno)
        {
            try
            {
                var CurDetList = strrep.GetStlyeImgdet(Style, Orderno);

                return new Response<IQueryable<Domain.BuyOrdImg>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.BuyOrdImg>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public  Response<IQueryable<Domain.BuyOrderStyle>> GetStlyeImgOrder(string Style)
        {
            try
            {
                var strlist = strrep.GetStlyeImgOrder(Style);

                return new Response<IQueryable<Domain.BuyOrderStyle>>(strlist, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }




    }
}
