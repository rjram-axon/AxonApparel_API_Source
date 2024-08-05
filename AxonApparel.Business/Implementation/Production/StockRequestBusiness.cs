using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public class StockRequestBusiness : IStockRequestBusiness
    {
        IStockRequestRepository repo = new StockRequestRepository();

        public Common.Response<IQueryable<Domain.StockRequestDet>> Loadgrid(int? Reqstno, int? Entryno)
        {
            try
            {
                var ProductWO = repo.Loadgrid(Reqstno, Entryno);

                return new Response<IQueryable<Domain.StockRequestDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockRequestDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Common.Response<IQueryable<Domain.BoxDespatchMas>> LoadMaingrid(int Companyid, int Despatchid, string fromdate, string Todate)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(Companyid, Despatchid, fromdate, Todate);

                return new Response<IQueryable<Domain.BoxDespatchMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.BoxDespatchMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.StockRequestDet>> GetitmEditGrid(int masid)
        {
            try
            {
                var ProductWO = repo.GetitmRepEditGrid(masid);

                return new Response<IQueryable<Domain.StockRequestDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockRequestDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.ItmStkDet>> GetitmEditStockGrid(int masid)
        {
            try
            {
                var ProductWO = repo.GetitmRepEditStockGrid(masid);

                return new Response<IQueryable<Domain.ItmStkDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> AddBuss(BoxDespatchMas opj)
        {
            try
            {
                AxonApparel.Repository.Box_Despatch_mas despmas = new AxonApparel.Repository.Box_Despatch_mas
                {
                    DespatchId = opj.DespatchId,
                    Companyid = opj.Companyid,
                    DespatchNo = opj.DespatchNo,
                    DespatchDate = opj.DespatchDate,
                    CreatedBy = opj.CreatedBy,
                };

                var stkreqList = new List<Repository.Box_Despatch_Det>();

                foreach (var stkreqItem in opj.stockreqdetail)
                {

                    stkreqList.Add(new Repository.Box_Despatch_Det
                    {
                        DespatchDetid = stkreqItem.DespatchDetid,
                        DespatchId = stkreqItem.DespatchId,
                        RequestNo = stkreqItem.EntryNo,
                        SkuNo = stkreqItem.SKUstkno,
                        Qty = stkreqItem.IssuQuantity,
                        StockReqDetID=stkreqItem.StockReqDetID
                    });

                }
                var ItmskList = new List<Repository.Box_Despatch_Stock>();

                foreach (var itmstkItem in opj.itmstkdetail)
                {
                    ItmskList.Add(new Repository.Box_Despatch_Stock
                    {

                        StockId = itmstkItem.StockId,
                        Qty = itmstkItem.IssueQty

                    });

                }

                var result = repo.Add(despmas, stkreqList, ItmskList);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Common.Response<IQueryable<Domain.StockRequestDet>> LoadQntygrid(string SkuNo)
        {
            try
            {
                var ProductWO = repo.LoadQntygrid(SkuNo);

                return new Response<IQueryable<Domain.StockRequestDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockRequestDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Common.Response<IQueryable<Domain.ItmStkDet>> LoadgridItmstock(string SkuNo)
        {
            try
            {
                var ProductWO = repo.LoadgridItmstock(SkuNo);
                object[] dw = ProductWO.ToArray();
                return new Response<IQueryable<Domain.ItmStkDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<StockRequestDet>> GetBussSknDetails()
        {
            try
            {
                var ProductWO = repo.GetRepSknDetails();

                return new Response<IQueryable<StockRequestDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StockRequestDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
         public Response<IQueryable<BoxDespatchMas>> GetBussDespatchNo()
        {
            try
            {
                var ProductWO = repo.GetRepDespatchNo();

                return new Response<IQueryable<BoxDespatchMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<BoxDespatchMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<StockRequestDet>> GetBussReqstDetails()
        {
            try
            {
                var ProductWO = repo.GetRepReqstDetails();

                return new Response<IQueryable<StockRequestDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StockRequestDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateBoxEntry(BoxDespatchMas BxUEntry)
        {
            try
            {
                AxonApparel.Repository.Box_Despatch_mas despmas = new AxonApparel.Repository.Box_Despatch_mas
                   {
                       DespatchId = BxUEntry.DespatchId,
                       Companyid = BxUEntry.Companyid,
                       DespatchNo = BxUEntry.DespatchNo,
                       DespatchDate = BxUEntry.DespatchDate,
                       CreatedBy = BxUEntry.CreatedBy,
                   };

                var stkreqList = new List<Repository.Box_Despatch_Det>();

                foreach (var stkreqItem in BxUEntry.stockreqdetail)
                {
                    stkreqList.Add(new Repository.Box_Despatch_Det
                    {
                        DespatchDetid = stkreqItem.DespatchDetid,
                        DespatchId = stkreqItem.DespatchId,
                        RequestNo = stkreqItem.EntryNo,
                        SkuNo = stkreqItem.SKUstkno,
                        Qty = stkreqItem.IssuQuantity,
                        StockReqDetID = stkreqItem.StockReqDetID
                    });

                }
                var ItmskList = new List<Repository.Box_Despatch_Stock>();

                foreach (var itmstkItem in BxUEntry.itmstkdetail)
                {
                    ItmskList.Add(new Repository.Box_Despatch_Stock
                    {

                        StockId = itmstkItem.StockId,
                        Qty = itmstkItem.IssueQty,
                        OldQty = itmstkItem.OldQty,

                    });
                }
                var result = repo.UpdateDetData(despmas, stkreqList, ItmskList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteBoxEntry(BoxDespatchMas BxDEntry)
        {
            try
            {
                AxonApparel.Repository.Box_Despatch_mas despmas = new AxonApparel.Repository.Box_Despatch_mas
                {
                    DespatchId = BxDEntry.DespatchId,
                    Companyid = BxDEntry.Companyid,
                    DespatchNo = BxDEntry.DespatchNo,
                    DespatchDate = BxDEntry.DespatchDate,
                    CreatedBy = BxDEntry.CreatedBy,
                };

                var stkreqList = new List<Repository.Box_Despatch_Det>();

                foreach (var stkreqItem in BxDEntry.stockreqdetail)
                {

                    stkreqList.Add(new Repository.Box_Despatch_Det
                    {
                        DespatchDetid = stkreqItem.DespatchDetid,
                        DespatchId = stkreqItem.DespatchId,
                        RequestNo = stkreqItem.EntryNo,
                        SkuNo = stkreqItem.SKUstkno,
                        Qty = stkreqItem.IssuQuantity,
                        StockReqDetID = stkreqItem.StockReqDetID
                    });

                }
                var ItmskList = new List<Repository.Box_Despatch_Stock>();

                foreach (var itmstkItem in BxDEntry.itmstkdetail)
                {
                    ItmskList.Add(new Repository.Box_Despatch_Stock
                    {
                        StockId = itmstkItem.StockId,
                        Qty = itmstkItem.IssueQty,
                        OldQty=itmstkItem.OldQty,
                    });
                }
                var result = repo.DeleteDetData(despmas, stkreqList, ItmskList);
                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

    }
}
