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
    public class BulkOrderMeasurementBusiness:IBulkOrderMeasurementBusiness
    {
        IBulkOrderMeasurementRepository OrdMeAddRep = new BulkOrderMeasurementRepository();

        public Response<IQueryable<BulkOrderMeasurement>> GetDataByOrderMeasu(int Id)
        {
            try
            {
                var ProductWO = OrdMeAddRep.GetDataRepOrderDetails(Id);

                return new Response<IQueryable<BulkOrderMeasurement>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<BulkOrderMeasurement>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<BuyOrdImg>> GetOrderMeasuImg(int Id)
        {
            try
            {
                var ProductWO = OrdMeAddRep.GetOrderMeasuImg(Id);

                return new Response<IQueryable<BuyOrdImg>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<BuyOrdImg>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<BulkOrderMeasurementItemDet>> ListEntryItemDetails(int Id,string OrdNo)
        {
            try
            {
                var CurRGList = OrdMeAddRep.GetRepMeasItemLoad(Id, OrdNo);

                return new Response<IList<BulkOrderMeasurementItemDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BulkOrderMeasurementItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<BulkOrderMeasurementItemDet>> ListEntrySizeItemDetails(int Id,string OrdNo)
        {
            try
            {
                var CurRGList = OrdMeAddRep.GetRepMeasSizeItemLoad(Id, OrdNo);

                return new Response<IList<BulkOrderMeasurementItemDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BulkOrderMeasurementItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateMOrderEntry(BulkOrderMeasurement MEntry)
        {
            int? BMasID = 0;
            int? StyRowID = 0;
            int? CompId = 0;
            int? ItmId = 0;
            string Remarks = "";
               

            if (MEntry.BuyMasId == 0)
            {
                BMasID = null;
            }
            else
            {
                BMasID = MEntry.BuyMasId;
            }
            if (MEntry.StyleRowid == 0)
            {
                StyRowID = null;
            }
            else
            {
                StyRowID = MEntry.StyleRowid;
            }
            if (MEntry.Remarks == null)
            {
                Remarks = null;
            }
            else
            {
                Remarks = MEntry.Remarks;
            }
                
            try
            {

                AxonApparel.Repository.Buy_Ord_MeasureMas meaordInsert = new AxonApparel.Repository.Buy_Ord_MeasureMas
                {
                    OrderNo = MEntry.OrderNo,
                    BuyMasId = BMasID,
                    StyleRowid = StyRowID,
                    Remarks = Remarks,
                    MeasureDate = MEntry.MeasureDate,
                    AMEND = MEntry.AMEND,
                    CheckIns = MEntry.ChkIns,
                };

                var ItmList = new List<Buy_ord_MeasureDet>();

                foreach (var PItem in MEntry.BulkMeaDet)
                {
                    if (PItem.ITEMID == 0)
                    {
                        ItmId = null;
                    }
                    else
                    {
                        ItmId = PItem.ITEMID;
                    }

                    if (PItem.CompItemId == 0)
                    {
                        CompId = null;
                    }
                    else
                    {
                        CompId = PItem.CompItemId;
                    }
                    if (PItem.CompItemId > 0)
                    {
                        ItmList.Add(new Buy_ord_MeasureDet
                        {
                            MeasureMasid = PItem.MeasureMasId,
                            MeasureDetid = PItem.MeasureDetid,
                            CompItemId = CompId,
                            ITEMID = ItmId,
                            MeasureName = PItem.MeasureName,
                            Increment = PItem.Increment,
                            Tolerance = PItem.Tolerance,
                            Lookup = PItem.Lookup,
                       
                        });
                    }
                }

                var OrdListDetails = new List<Buy_ord_MeasureSizedet>();

                if (MEntry.BulkMeaSizeDet != null)
                {
                    foreach (var POrderDetails in MEntry.BulkMeaSizeDet)
                    {

                        OrdListDetails.Add(new Buy_ord_MeasureSizedet
                        {
                            Sizeid = POrderDetails.Sizeid,
                            MeasureDetid = POrderDetails.MeasureDetid,
                            MeasureMasId = POrderDetails.MeasureMasId,
                            Qty = POrderDetails.Qty,
                            GItemId = POrderDetails.ITEMID,
                            CompId = POrderDetails.CompItemId,

                        });
                    }
                }
                var ImgDet = new List<Ord_Mesurement_Img>();

                if (MEntry.OrderMesurmentImage != null)
                {
                    foreach (var d in MEntry.OrderMesurmentImage)
                    {
                        ImgDet.Add(new Ord_Mesurement_Img
                            {
                                Img_path = d.Imgpath,
                                Img_Title = d.Imgtitle,
                                Ord_No = d.Order_no,
                                Sty_Row_Id = StyRowID,
                            });
                    }
                }

                var result = OrdMeAddRep.AddDetData(meaordInsert, ItmList, OrdListDetails, ImgDet);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateMeaEntry(BulkOrderMeasurement MUEntry)
        {
            int? BMasID = 0;
            int? StyRowID = 0;
            int? CompId = 0;
            int? ItmId = 0;
            string Remarks = "";
                       

            if (MUEntry.BuyMasId == 0)
            {
                BMasID = null;
            }
            else
            {
                BMasID = MUEntry.BuyMasId;
            }
            if (MUEntry.StyleRowid == 0)
            {
                StyRowID = null;
            }
            else
            {
                StyRowID = MUEntry.StyleRowid;
            }
            if (MUEntry.Remarks == null)
            {
                Remarks = null;
            }
            else
            {
                Remarks = MUEntry.Remarks;
            }
            
            try
            {

                AxonApparel.Repository.Buy_Ord_MeasureMas meaordupdate = new AxonApparel.Repository.Buy_Ord_MeasureMas
                {
                    OrderNo = MUEntry.OrderNo,
                    BuyMasId = BMasID,
                    StyleRowid = StyRowID,
                    Remarks = Remarks,
                    MeasureDate = MUEntry.MeasureDate,
                    AMEND = MUEntry.AMEND,
                    MeasureMasId=MUEntry.MeasureMasId,
                    CheckIns=MUEntry.ChkIns,
                };

                var EItmList = new List<Buy_ord_MeasureDet>();

                foreach (var EPItem in MUEntry.BulkMeaDet)
                {
                    if (EPItem.ITEMID == 0)
                    {
                        ItmId = null;
                    }
                    else
                    {
                        ItmId = EPItem.ITEMID;
                    }

                    if (EPItem.CompItemId == 0)
                    {
                        CompId = null;
                    }
                    else
                    {
                        CompId = EPItem.CompItemId;
                    }
                    if (EPItem.CompItemId > 0)
                    {
                        EItmList.Add(new Buy_ord_MeasureDet
                        {
                            MeasureMasid = EPItem.MeasureMasId,
                            MeasureDetid = EPItem.MeasureDetid,
                            CompItemId = CompId,
                            ITEMID = ItmId,
                            MeasureName = EPItem.MeasureName,
                            Increment = EPItem.Increment,
                            Tolerance = EPItem.Tolerance,
                            Lookup = EPItem.Lookup,
                        });
                    }
                }

                var EOrdListDetails = new List<Buy_ord_MeasureSizedet>();

                if (MUEntry.BulkMeaSizeDet != null)
                {
                    foreach (var EPOrderDetails in MUEntry.BulkMeaSizeDet)
                    {

                        EOrdListDetails.Add(new Buy_ord_MeasureSizedet
                        {
                            Sizeid = EPOrderDetails.Sizeid,
                            MeasureDetid = EPOrderDetails.MeasureDetid,
                            MeasureMasId = EPOrderDetails.MeasureMasId,
                            Qty = EPOrderDetails.Qty,
                            GItemId = EPOrderDetails.ITEMID,
                            CompId = EPOrderDetails.CompItemId,

                        });
                    }
                }
                var ImgDet = new List<Ord_Mesurement_Img>();

                if (MUEntry.OrderMesurmentImage != null)
                {
                    foreach (var d in MUEntry.OrderMesurmentImage)
                    {
                        ImgDet.Add(new Ord_Mesurement_Img
                        {
                            Img_path = d.Imgpath,
                            Img_Title = d.Imgtitle,
                            Ord_No = d.Order_no,
                            Sty_Row_Id = StyRowID,
                        });
                    }
                }
                var result = OrdMeAddRep.UpdateDetData(meaordupdate, EItmList, EOrdListDetails, ImgDet);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteMeas(BulkOrderMeasurement MDEntry)
        {
            int? BMasID = 0;
            int? StyRowID = 0;
            int? CompId = 0;
            int? ItmId = 0;
            string Remarks = "";


            if (MDEntry.BuyMasId == 0)
            {
                BMasID = null;
            }
            else
            {
                BMasID = MDEntry.BuyMasId;
            }
            if (MDEntry.StyleRowid == 0)
            {
                StyRowID = null;
            }
            else
            {
                StyRowID = MDEntry.StyleRowid;
            }
            if (MDEntry.Remarks == null)
            {
                Remarks = null;
            }
            else
            {
                Remarks = MDEntry.Remarks;
            }
            
            try
            {

                AxonApparel.Repository.Buy_Ord_MeasureMas meaordDel = new AxonApparel.Repository.Buy_Ord_MeasureMas
                {
                    OrderNo = MDEntry.OrderNo,
                    BuyMasId = BMasID,
                    StyleRowid = StyRowID,
                    Remarks = Remarks,
                    MeasureDate = MDEntry.MeasureDate,
                    AMEND = MDEntry.AMEND,
                    MeasureMasId = MDEntry.MeasureMasId,
                    CheckIns = MDEntry.ChkIns,
                };

                var DItmList = new List<Buy_ord_MeasureDet>();

                foreach (var DPItem in MDEntry.BulkMeaDet)
                {
                    if (DPItem.ITEMID == 0)
                    {
                        ItmId = null;
                    }
                    else
                    {
                        ItmId = DPItem.ITEMID;
                    }

                    if (DPItem.CompItemId == 0)
                    {
                        CompId = null;
                    }
                    else
                    {
                        CompId = DPItem.CompItemId;
                    }
                    if (DPItem.CompItemId > 0)
                    {
                        DItmList.Add(new Buy_ord_MeasureDet
                        {
                            MeasureMasid = DPItem.MeasureMasId,
                            MeasureDetid = DPItem.MeasureDetid,
                            CompItemId = CompId,
                            ITEMID = ItmId,
                            MeasureName = DPItem.MeasureName,
                            Increment = DPItem.Increment,
                            Tolerance = DPItem.Tolerance,
                            Lookup = DPItem.Lookup,

                        });
                    }
                }

                var DOrdListDetails = new List<Buy_ord_MeasureSizedet>();

                if (MDEntry.BulkMeaSizeDet != null)
                {
                    foreach (var DOrderDetails in MDEntry.BulkMeaSizeDet)
                    {

                        DOrdListDetails.Add(new Buy_ord_MeasureSizedet
                        {
                            Sizeid = DOrderDetails.Sizeid,
                            MeasureDetid = DOrderDetails.MeasureDetid,
                            MeasureMasId = DOrderDetails.MeasureMasId,
                            Qty = DOrderDetails.Qty,
                            GItemId = DOrderDetails.ITEMID,
                            CompId = DOrderDetails.CompItemId,

                        });
                    }
                }

                
                var result = OrdMeAddRep.DeleteDetData(meaordDel, DItmList, DOrdListDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<BulkOrderMeasurementItemDet>> ListEntryCompEditItemDetails(int Id)
        {
            try
            {
                var CurRGList = OrdMeAddRep.GetRepMeascompEditItemLoad(Id);

                return new Response<IList<BulkOrderMeasurementItemDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BulkOrderMeasurementItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<BulkOrderMeasurementItemDet>> ListEntryEditSizeItemDetails(int Id)
        {
            try
            {
                var CurRGList = OrdMeAddRep.GetRepMeasEditSizeItemLoad(Id);

                return new Response<IList<BulkOrderMeasurementItemDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<BulkOrderMeasurementItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
