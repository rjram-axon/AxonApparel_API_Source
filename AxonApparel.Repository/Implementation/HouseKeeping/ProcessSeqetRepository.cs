using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Web.Mvc;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ProcessSeqetRepository : IProcessSeqetRepository
    {

        HouseKeepingEntities entities = new HouseKeepingEntities();

        int ProsId = 0;

        public bool AddDetData(List<Process> objPDet)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    var dy = entities.Process;

                    foreach (var dbSet in dy)
                    {
                        if (dbSet != null)
                        {
                            dbSet.SeqNo = 0;
                        }
                    }

                    entities.SaveChanges();
                    //foreach (var j in objPDet)
                    //{
                    //    var d = entities.Processes.Where(a => a.ProcessId.Equals(j.ProcessId)).FirstOrDefault();
                    //    if (d != null)
                    //    {
                    //        d.SeqNo = 0;
                    //    }
                    //}

                  


                    foreach (var PSeq in objPDet)
                    {
                        var PgSeqDet = entities.Proc_Apparel_GetProSeqSetUpdate(PSeq.ProcessId, PSeq.SeqNo);
                        entities.SaveChanges();
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }

            }
            return reserved;
        }
    }
}
