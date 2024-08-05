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
    public class ProcessSeqProcBusiness : IProcessSeqProcBusiness
    {
        IProcessSeqProcRepository repo = new ProcessSeqProcRepository();



        public Response<IQueryable<ProcessSequenceMain>> GetDataPlanDetails(int Id)
        {

            try
            {
                var ProductWO = repo.GetDataPlanDetails(Id);

                return new Response<IQueryable<ProcessSequenceMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessSequenceMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessSequenceMain>> GetDataAddList()
        {
            try
            {
                var CurDetList = repo.GetDataAddList();

                return new Response<IQueryable<ProcessSequenceMain>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<ProcessSequenceMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateConEntry(ProcessSequenceMain PSeqEnty, int[] upsbTwo)
        {
            try
            {
                //var ID = repo.UpdateData(new AxonApparel.Repository.ProcessSeq_Mas
                //{

                //    Job_ord_no = PSeqEnty.JobNo,
                //    OrderType = PSeqEnty.OrdType,
                //    EntryDate = PSeqEnty.EntryDate,
                //    CreatedBy = PSeqEnty.CreatedBy,
                //    Proc_seq_masid = PSeqEnty.Processseqmasid,
                //});


                AxonApparel.Repository.ProcessSeq_Mas proseqEdit = new AxonApparel.Repository.ProcessSeq_Mas
                {
                    Job_ord_no = PSeqEnty.JobNo,
                    OrderType = PSeqEnty.OrdType,
                    EntryDate = PSeqEnty.EntryDate,
                    CreatedBy = PSeqEnty.CreatedBy,
                    Proc_seq_masid = PSeqEnty.Processseqmasid,

                };


                var detailList = new List<ProcessSeq>();
                var PrSeq = 0;
                foreach (var item in upsbTwo)
                {
                    PrSeq = PrSeq + 1;
                    detailList.Add(new ProcessSeq
                    {
                        ProcessSeqid = PrSeq,
                        Processid = item,
                        Proc_seq_masid = PSeqEnty.Processseqmasid,
                        //PSeqId = PSeqEnty.ps

                    });
                }
                var result = repo.UpdateDetData(proseqEdit,detailList);

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateProcessMainEntry(ProcessSequenceMain PSeqEnty, int[] sbTwo)
        {

            try
            {
                

                AxonApparel.Repository.ProcessSeq_Mas proseqInsert = new AxonApparel.Repository.ProcessSeq_Mas
                {
                    Job_ord_no = PSeqEnty.JobNo,
                    OrderType = PSeqEnty.OrdType,
                    EntryDate = PSeqEnty.EntryDate,
                    CreatedBy = PSeqEnty.CreatedBy,

                };


                List<ProcessSeq> categoryRepo = new List<ProcessSeq>();

                var PrSeq = 0;

                foreach (var ProcessId in sbTwo)
                {
                    PrSeq = PrSeq + 1;


                    categoryRepo.Add(new ProcessSeq()
                    {

                        //Proc_seq_masid = ID,
                        Processid = ProcessId,
                        ProcessSeqid = PrSeq,
                    });
                }

                var result = repo.AddDetData(proseqInsert, categoryRepo);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProcessList>> GetProcSeqList(int StyleRId)
        {

            try
            {
                var CurDetList = repo.GetProcSeqDetList(StyleRId);

                return new Response<IList<ProcessList>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProcessList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessSequenceMain>> Getstylerowid(int Id)
        {
            try
            {
                var CurDetList = repo.GetStylerowid(Id);

                return new Response<IQueryable<ProcessSequenceMain>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<ProcessSequenceMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessSequenceMain>> GetDataByProSeq(int[] Processid, string JobNo)
        {
            try
            {

                List<ProcessSeq> categoryRepo = new List<ProcessSeq>();

                var PrSeq = 0;

                foreach (var ProcessId in Processid)
                {
                    PrSeq = PrSeq + 1;


                    categoryRepo.Add(new ProcessSeq()
                    {

                        //Proc_seq_masid = ID,
                        Processid = ProcessId,
                        ProcessSeqid = PrSeq,
                    });
                }

                var CurDetList = repo.GetRepProSeq(categoryRepo, JobNo);

                return new Response<IQueryable<ProcessSequenceMain>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<ProcessSequenceMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        

        public Response<bool> CreateAutoPrgEntry(int[] Processid, string JobNo, int UserId)
        {

            try
            {


                List<ProcessSeq> categoryRepo = new List<ProcessSeq>();

                var PrSeq = 0;

                foreach (var ProcessId in Processid)
                {
                    PrSeq = PrSeq + 1;


                    categoryRepo.Add(new ProcessSeq()
                    {

                        //Proc_seq_masid = ID,
                        Processid = ProcessId,
                        ProcessSeqid = PrSeq,
                    });
                }

                var result = repo.GetRepAutoPrg(categoryRepo, JobNo, UserId);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessSequenceMain>> GetDataByPrgProSeq(int[] Processid, string JobNo)
        {
            try
            {

                List<ProcessSeq> categoryRepo = new List<ProcessSeq>();

                var PrSeq = 0;

                foreach (var ProcessId in Processid)
                {
                    PrSeq = PrSeq + 1;


                    categoryRepo.Add(new ProcessSeq()
                    {

                        //Proc_seq_masid = ID,
                        Processid = ProcessId,
                        ProcessSeqid = PrSeq,
                    });
                }

                var CurDetList = repo.GetRepPrgProSeq(categoryRepo, JobNo);

                return new Response<IQueryable<ProcessSequenceMain>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<ProcessSequenceMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }

}

