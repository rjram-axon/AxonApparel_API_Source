using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;
using System.Data.Entity;

namespace AxonApparel.Business
{
    public class VendorEntryBusiness : IVendorEntryBusiness
    {

        IVendorEntryRepository vrep = new VendorEntryRepository();


        public Response<IList<VendorEntry>> GetDataOrdItemList(string MasId)
        {
            try
            {
                var ProductWO = vrep.GetDataRepItemDetails(MasId);

                return new Response<IList<VendorEntry>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<VendorEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateVendorEntry(Vendor VEnt)
        {
            try
            {


                var VenMasterId = vrep.AddData(new AxonApparel.Repository.VendorQuoteMas
                {

                    Quoteid = VEnt.Quoteid,
                    QuoteNo = VEnt.QuoteNo,
                    QuoteDate = VEnt.QuoteDate,
                    EntryNo = VEnt.EntryNo,
                    EntryDate = VEnt.EntryDate,
                    AutoManual = VEnt.AutoManual,
                    Supplierid = VEnt.Supplierid,
                    BuyOrdGeneral = VEnt.BuyOrdGeneral,
                    Buy_ord_no = VEnt.Buy_ord_no,
                    //Buy_Ord_MasId=VEnt.Buy_Ord_MasId,
                    Remarks = VEnt.Remarks,
                    Companyid = VEnt.Companyid,
                    Commit_Cancel = VEnt.Commit_Cancel,
                    CurrencyId = VEnt.CurrencyId,
                    CreatedBy = VEnt.CreatedBy,
                    Exchangerate = VEnt.Exchangerate,
                    ActiveFrom = VEnt.ActiveFrom,
                    //APPROVALDATE=VEnt.APPROVALDATE,
                    //APPROVEDBY = VEnt.APPROVEDBY,
                    ApprovedStatus = VEnt.ApprovedStatus,

                });

                var detailList = new List<VendorQuoteDet>();

                foreach (var item in VEnt.VendorDet)
                {
                    detailList.Add(new VendorQuoteDet
                    {

                        QuoteDetid = item.QuoteDetid,
                        Quoteid = VenMasterId,
                        Itemid = item.Itemid,
                        Colorid = item.Colorid,
                        Sizeid = item.Sizeid,
                        Uomid = item.Uomid,
                        Quantity = item.Quantity,
                        Rate = item.Rate,
                        MinQty = item.MinQty,
                        Apprate = item.Apprate,
                        //AppDate=item.AppDate,
                        Buy_ord_no = item.Buy_ord_no,
                        // Buy_Ord_MasId=item.Buy_Ord_MasId,
                        //ApprovedBy = item.ApprovedBy,
                        MaxQty = item.MaxQty,
                        StyleId = item.StyleId,
                    });
                }
                var result = vrep.AddDetData(detailList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Vendor>> GetDataVenBusDetails(int QMId)
        {
            try
            {
                var ProductWO = vrep.GetDataVenDetails(QMId);

                return new Response<IQueryable<Vendor>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Vendor>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<VendorEntry>> GetEditDetList(int MasId)
        {
            try
            {
                var ProductWO = vrep.GetDataEditVenDetails(MasId);

                return new Response<IList<VendorEntry>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<VendorEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<VendorEntry>> GetPurQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid, int Compid)
        {
            try
            {
                var ProductWO = vrep.GetPurQuoteforPlan(WorkordNo, itemid, Colorid, Sizeid, Compid);

                return new Response<IList<VendorEntry>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<VendorEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateVendorEntry(Vendor CEnty)
        {
            try
            {
                var QID = vrep.UpdateData(new AxonApparel.Repository.VendorQuoteMas
                {

                    Quoteid = CEnty.Quoteid,
                    QuoteNo = CEnty.QuoteNo,
                    QuoteDate = CEnty.QuoteDate,
                    EntryNo = CEnty.EntryNo,
                    EntryDate = CEnty.EntryDate,
                    AutoManual = CEnty.AutoManual,
                    Supplierid = CEnty.Supplierid,
                    BuyOrdGeneral = CEnty.BuyOrdGeneral,
                    Buy_ord_no = CEnty.Buy_ord_no,
                    //Buy_Ord_MasId=VEnt.Buy_Ord_MasId,
                    Remarks = CEnty.Remarks,
                    Companyid = CEnty.Companyid,
                    Commit_Cancel = CEnty.Commit_Cancel,
                    CurrencyId = CEnty.CurrencyId,
                    CreatedBy = CEnty.CreatedBy,
                    Exchangerate = CEnty.Exchangerate,
                    ActiveFrom = CEnty.ActiveFrom,
                    //APPROVALDATE=VEnt.APPROVALDATE,
                    //APPROVEDBY = VEnt.APPROVEDBY,
                    ApprovedStatus = CEnty.ApprovedStatus,

                });

                var detailConList = new List<VendorQuoteDet>();

                foreach (var Venitem in CEnty.VendorDet)
                {
                    detailConList.Add(new VendorQuoteDet
                    {


                        QuoteDetid = Venitem.QuoteDetid,
                        Quoteid = CEnty.Quoteid,
                        Itemid = Venitem.Itemid,
                        Colorid = Venitem.Colorid,
                        Sizeid = Venitem.Sizeid,
                        Uomid = Venitem.Uomid,
                        Quantity = Venitem.Quantity,
                        Rate = Venitem.Rate,
                        MinQty = Venitem.MinQty,
                        Apprate = Venitem.Apprate,
                        //AppDate=item.AppDate,
                        Buy_ord_no = Venitem.Buy_ord_no,
                        // Buy_Ord_MasId=item.Buy_Ord_MasId,
                        //ApprovedBy = item.ApprovedBy,
                        MaxQty = Venitem.MaxQty,
                    });
                }
                var result = vrep.UpdateDetData(detailConList);

                //


                //edit add


                var DList = new List<VendorQuoteDet>();

                foreach (var PItem in CEnty.VendorDet)
                {
                    if (PItem.QuoteDetid == 0)
                    {
                        DList.Add(new VendorQuoteDet
                        {

                            QuoteDetid = PItem.QuoteDetid,
                            Quoteid = CEnty.Quoteid,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Uomid = PItem.Uomid,
                            Quantity = PItem.Quantity,
                            Rate = PItem.Rate,
                            MinQty = PItem.MinQty,
                            Apprate = PItem.Apprate,
                            //AppDate=item.AppDate,
                            Buy_ord_no = PItem.Buy_ord_no,
                            // Buy_Ord_MasId=item.Buy_Ord_MasId,
                            //ApprovedBy = item.ApprovedBy,
                            MaxQty = PItem.MaxQty,
                        });
                    }
                }
                var result3 = vrep.AddEditDetData(DList);

                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }

        }
    }
}
