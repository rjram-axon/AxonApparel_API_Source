using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IS1SamplePhotoRepository : IBaseRepository<S1SamplePhotoEntry>
    {
        IList<Domain.S1SamplePhoto> GetS1Entry();
    }
}
