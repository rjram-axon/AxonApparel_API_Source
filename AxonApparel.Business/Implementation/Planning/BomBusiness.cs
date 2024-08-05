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
    public class BomBusiness : IBomBusiness
    {
        IBomRepository repo = new BomRepository();

        public Common.Response<IQueryable<Domain.Bom>> GetItemList()
        {
            try
            {
                var CurDetList = repo.GetItemList();

                return new Response<IQueryable<Bom>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Bom>> Getitemgrouplist()
        {
            try
            {
                var CurDetList = repo.Getitemgrouplist();

                return new Response<IQueryable<Bom>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }





        public Response<IList<Bom>> GetList(string orderno, int styleid, string OType, string IGId)
        {

            try
            {
                var CurDetList = repo.GetDetList(orderno, styleid, OType, IGId);

                return new Response<IList<Bom>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Update(Bom obj, int StyRowId, string OType)
        {
            try
            {

                //AxonApparel.Repository.Buy_Ord_BOMDet BomDetUpdate = new AxonApparel.Repository.Buy_Ord_BOMDet
                //{
                //    Buy_Ord_BOMDetid = obj.Buyordmasdetid,
                //    Buy_Ord_BOMid = obj.Buyordmasid,
                //    CSP = obj.CSP,
                //    Prg_qty = obj.pgmqty,
                //    Received_qty = obj.recvdqty,
                //    ItemClosure = obj.ItemClosure,
                //    PurForJob = obj.PurFor_Job,
                //    BOM_qty = obj.BOM_qty,
                //    UOMid = obj.Uomid,
                //    Itemid = obj.Itemid,
                //    Colorid = obj.Colorid,
                //    Sizeid = obj.Sizeid,
                //    Pur_UOMid = obj.Pur_UOMid,
                //    Issue_qty = obj.issueqty,
                //    ToPurUOM = obj.ToPurUOM,
                //    Conv_Mode = obj.Conv_Mode,
                //    Cancel_Qty = obj.Cancel_Qty,
                    

                //};

                var ItmList = new List<Buy_Ord_BOMDet>();

                foreach (var PItem in obj.BomListDet)
                {

                    int? CID = 0;

                    if (PItem.Colorid == 0)
                    {
                        CID = null;
                    }
                    else
                    {
                        CID = PItem.Colorid;
                    }

                    int? UomID = 0;

                    if (PItem.Uomid == 0)
                    {
                        UomID = null;
                    }
                    else
                    {
                        UomID = PItem.Uomid;
                    }
                    int? PUomID = 0;

                    if (PItem.Pur_UOMid == 0)
                    {
                        PUomID = null;
                    }
                    else
                    {
                        PUomID = PItem.Pur_UOMid;
                    }

                    ItmList.Add(new Buy_Ord_BOMDet
                    {
                    Buy_Ord_BOMDetid = PItem.Buyordmasdetid,
                    Buy_Ord_BOMid = PItem.Buyordmasid,
                    CSP = PItem.CSP,
                    Prg_qty = PItem.pgmqty,
                    Received_qty = PItem.recvdqty,
                    ItemClosure = PItem.ItemClosure,
                    PurForJob = PItem.PurFor_Job,
                    BOM_qty = PItem.BOM_qty,
                    UOMid = (int)UomID,//PItem.Uomid,
                    Itemid = PItem.Itemid,
                    Colorid = CID,//PItem.Colorid,
                    Sizeid = PItem.Sizeid,
                    Pur_UOMid = PUomID,//PItem.Pur_UOMid,
                    Issue_qty = PItem.issueqty,
                    ToPurUOM = PItem.ToPurUOM,
                    Conv_Mode = PItem.Conv_Mode,
                    Cancel_Qty = PItem.Cancel_Qty,
                    });

                };
                var result = repo.UpdateData(ItmList, StyRowId, OType);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Bom>> GetUCList(int uomid)
        {
            try
            {
                var CurDetList = repo.GetUCList(uomid);

                return new Response<IQueryable<Bom>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Bom>> GetUomList(string baseunit)
        {
            try
            {
                var CurDetList = repo.GetUomList(baseunit);

                return new Response<IQueryable<Bom>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
