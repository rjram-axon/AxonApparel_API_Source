using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
//using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class ProcessSeqSetBusiness:IProcessSeqSetBusiness

    {

        IProcessSeqetRepository repo = new ProcessSeqetRepository();

        public Response<bool> CreateProcessSeqSetUpEntry(int[] sbTwo)
        {
            try
            {



                List<Process> categoryRepo = new List<Process>();

                var PrSeq = 0;

                foreach (var ProcessId in sbTwo)
                {
                    PrSeq = PrSeq + 1;


                    categoryRepo.Add(new Process()
                    {
                                            
                        ProcessId = ProcessId,
                        SeqNo = PrSeq,
                    });
                }

                var result = repo.AddDetData(categoryRepo);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
