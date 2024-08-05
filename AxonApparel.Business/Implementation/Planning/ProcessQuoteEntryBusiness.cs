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
    public class ProcessQuoteEntryBusiness:IProcessQuoteEntryBusiness
    {
        IProcessQuoteEntryRepository Prep = new ProcessQuoteEntryRepository();

        public Response<bool> CreatePQuoteEntry(ProcessQuote PQEnt)
        {
            try
            {


                var PQMasterId = Prep.AddData(new AxonApparel.Repository.Process_Quote
                {

                    Process_Quoteid = PQEnt.Process_Quoteid,
                    RefNo = PQEnt.RefNo,
                    RefDate = PQEnt.RefDate,
                    companyid = PQEnt.companyid,
                    Process_QuoteDate = PQEnt.Process_QuoteDate,     
                    Process_QuoteNo=PQEnt.Process_QuoteNo,
                    Processorid = PQEnt.Processorid,
                    BuyOrdGeneral = PQEnt.BuyOrdGeneral,
                    Buy_ord_no = PQEnt.Buy_ord_no,          
                    Remarks = PQEnt.Remarks,
                    Commit_Cancel = PQEnt.Commit_Cancel,
                 

                });

                var detailList = new List<Process_QuotePro>();
               
                foreach (var item in PQEnt.ProQuoteProcess)
                {
                    detailList.Add(new Process_QuotePro
                    {

                        Process_QuoteProid=item.Process_QuoteProid,
                        Process_Quoteid = PQMasterId,
                        Processid=item.Processid,
                        Job_ord_no=item.Job_ord_no,
                        PsNo=item.PsNo,
                    });
                }
                var detailDetList = new List<Process_Quote_Det>();
                
                foreach (var itemdet in PQEnt.ProQuoteDet)
                {
                    detailDetList.Add(new Process_Quote_Det
                    {

                        Process_Quoteid = PQMasterId,
                        Process_QuoteProid=itemdet.Process_Quoteid,
                        Itemid=itemdet.Itemid,
                        colorid=itemdet.Colorid,
                        sizeid=itemdet.Sizeid,
                        uomid=itemdet.Uomid,
                        rate=itemdet.rate,
                        MinQty=itemdet.MinQty,
                        AppRate = itemdet.AppRate,
                        Process_Quote_detid = itemdet.Process_Quote_detid,
                        PsNo = itemdet.PsNo,
                    });
                }
                var result = Prep.AddDetPrData(detailList, detailDetList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessQuote>> GetDataPQEditBusDetails(int PQMId)
        {
            try
            {
                var ProductPWO = Prep.GetDataEditRepDetails(PQMId);

                return new Response<IQueryable<ProcessQuote>>(ProductPWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessQuote>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProProcessQuote>> GetEditPQPRDetList(int MasId)
        {
            try
            {
                var ProductPrWO = Prep.GetEditPQPRRepDetList(MasId);

                return new Response<IList<ProProcessQuote>>(ProductPrWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProProcessQuote>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProcessQuoteDet>> GetEditPQIDetList(int MasId)
        {
            try
            {
                var ProductPIWO = Prep.GetDataEditPQIRepDetails(MasId);

                return new Response<IList<ProcessQuoteDet>>(ProductPIWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProcessQuoteDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdatePQEntry(ProcessQuote ObjUPend)
        {
            try
            {
                var QID = Prep.UpdateData(new AxonApparel.Repository.Process_Quote
                {

                    Process_Quoteid = ObjUPend.Process_Quoteid,
                    RefNo = ObjUPend.RefNo,
                    RefDate = ObjUPend.RefDate,
                    companyid = ObjUPend.companyid,
                    Process_QuoteDate = ObjUPend.Process_QuoteDate,
                    Process_QuoteNo = ObjUPend.Process_QuoteNo,
                    Processorid = ObjUPend.Processorid,
                    BuyOrdGeneral = ObjUPend.BuyOrdGeneral,
                    Buy_ord_no = ObjUPend.Buy_ord_no,
                    Remarks = ObjUPend.Remarks,
                    Commit_Cancel = ObjUPend.Commit_Cancel,

                });

                var detailConList = new List<Process_QuotePro>();
                var deldetprolist = new List<Process_QuotePro>();
                foreach (var PPro in ObjUPend.ProQuoteProcess)
                {
                    if (PPro.DelChk == 1)
                    {
                        deldetprolist.Add(new Process_QuotePro
                        {


                            Process_QuoteProid = PPro.Process_QuoteProid,
                            Process_Quoteid = ObjUPend.Process_Quoteid,
                            Processid = PPro.Processid,
                            Job_ord_no = PPro.Job_ord_no,
                            PsNo = PPro.PsNo,
                        });
                    }
                    else
                    {
                        detailConList.Add(new Process_QuotePro
                        {


                            Process_QuoteProid = PPro.Process_QuoteProid,
                            Process_Quoteid = ObjUPend.Process_Quoteid,
                            Processid = PPro.Processid,
                            Job_ord_no = PPro.Job_ord_no,
                            PsNo = PPro.PsNo,
                        });
                    }
                    
                }
                var result = Prep.UpdateDetData(deldetprolist,detailConList);

                var detailConItemList = new List<Process_Quote_Det>();
                var DeleteDetItemList = new List<Process_Quote_Det>();
                foreach (var PdPro in ObjUPend.ProQuoteDet)
                {
                    if (PdPro.DelChk == 1)
                    {
                        DeleteDetItemList.Add(new Process_Quote_Det
                        {
                            Process_Quoteid = ObjUPend.Process_Quoteid,
                            Process_QuoteProid = PdPro.Process_QuoteProid,
                            Itemid = PdPro.Itemid,
                            colorid = PdPro.Colorid,
                            sizeid = PdPro.Sizeid,
                            uomid = PdPro.Uomid,
                            rate = PdPro.rate,
                            MinQty = PdPro.MinQty,
                            AppRate = PdPro.AppRate,
                            Process_Quote_detid = PdPro.Process_Quote_detid,
                            PsNo = PdPro.PsNo,
                        });
                    }
                    else
                    {
                        detailConItemList.Add(new Process_Quote_Det
                        {
                            Process_Quoteid = ObjUPend.Process_Quoteid,
                            Process_QuoteProid = PdPro.Process_QuoteProid,
                            Itemid = PdPro.Itemid,
                            colorid = PdPro.Colorid,
                            sizeid = PdPro.Sizeid,
                            uomid = PdPro.Uomid,
                            rate = PdPro.rate,
                            MinQty = PdPro.MinQty,
                            AppRate = PdPro.AppRate,
                            Process_Quote_detid = PdPro.Process_Quote_detid,
                            PsNo = PdPro.PsNo,
                        });
                    }
                    
                }
                var result2 = Prep.UpdateItemDetData(DeleteDetItemList,detailConItemList);

                //


                //edit add

                var detailList = new List<Process_QuotePro>();

                foreach (var item in ObjUPend.ProQuoteProcess)
                {
                    //if (item.Process_QuoteProid == 0)
                    //{
                        detailList.Add(new Process_QuotePro
                        {

                            Process_QuoteProid = item.Process_QuoteProid,
                            Process_Quoteid = ObjUPend.Process_Quoteid,
                            Processid = item.Processid,
                            Job_ord_no = item.Job_ord_no,
                            PsNo = item.PsNo,
                        });
                    //}
                }
                var detailDetList = new List<Process_Quote_Det>();

                foreach (var itemdet in ObjUPend.ProQuoteDet)
                {
                    if (itemdet.Process_Quote_detid == 0)
                    {
                        detailDetList.Add(new Process_Quote_Det
                        {

                            Process_Quoteid = ObjUPend.Process_Quoteid,
                            Process_QuoteProid = itemdet.Process_QuoteProid,
                            Itemid = itemdet.Itemid,
                            colorid = itemdet.Colorid,
                            sizeid = itemdet.Sizeid,
                            uomid = itemdet.Uomid,
                            rate = itemdet.rate,
                            MinQty = itemdet.MinQty,
                            AppRate = itemdet.AppRate,
                            Process_Quote_detid = itemdet.Process_Quote_detid,
                            PsNo = itemdet.PsNo,
                        });
                    }
                }
                var result5 = Prep.AddDetPrData(detailList, detailDetList);

                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessQuote>> GetDataOrdDetails(int Id)
        {
            try
            {
                var ProdWO = Prep.GetDataOrdDetails(Id);

                return new Response<IQueryable<ProcessQuote>>(ProdWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessQuote>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        //public Response<IQueryable<ProcessQuote>> GetJobNo()
        //{
        //    try
        //    {
        //        var couList = Prep.GetDataList();
        //        return new Response<IQueryable<ProcessQuote>>(couList.Select(m => new ProcessQuote
        //        {
        //            //IsActive = m.IsActive ? "TRUE" : "FALSE",
        //            //CountryId = m.CountryId,
        //            //CityName = m.City1,
        //            //CountryName = m.Country.country1,
        //            //CityId = m.Id
                    

        //        }), Status.SUCCESS, "Fetched Successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<IQueryable<ProcessQuote>>(null, Status.ERROR, "OOPS error occured. Plase try again");
        //    }
        //}


        public Response<IList<ProProcessQuote>> GetOrdPQPRDetList(string JobOrdNo)
        {
            try
            {
                var ProductPrWOp = Prep.GetOrdPQPRRepDetList(JobOrdNo);

                return new Response<IList<ProProcessQuote>>(ProductPrWOp, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProProcessQuote>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProcessQuoteDet>> GetOrdItemList(string JobOrdNo, int ProId)
        {
            try
            {
                var ProductPrWOpd = Prep.GetOrdItemDet(JobOrdNo, ProId);

                return new Response<IList<ProcessQuoteDet>>(ProductPrWOpd, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProcessQuoteDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProcessQuoteDet>> GetProcessQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid, int Processid, int Compid)
        {
            try
            {
                var ProductPrWOpd = Prep.GetProcessQuoteforPlan(WorkordNo, itemid, Colorid, Sizeid, Processid, Compid);

                return new Response<IList<ProcessQuoteDet>>(ProductPrWOpd, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProcessQuoteDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProcessQuote>> GetEditOrderList(int MasId)
        {
            try
            {
                var ProductProWOp = Prep.GetRepOrdDetails(MasId);

                return new Response<IList<ProcessQuote>>(ProductProWOp, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProcessQuote>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
