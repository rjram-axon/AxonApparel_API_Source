CREATE TABLE [dbo].[Job_Inv_addless]
(
	[Id] INT IDENTITY(1,1) NOT NULL, 
    [JobInvId] INT NOT NULL, 
    [AddLessId] INT NOT NULL, 
    [Percentage] DECIMAL NOT NULL, 
    [Amount] DECIMAL(18, 3) NOT NULL, 
    [AOrL] CHAR(1) NOT NULL,
	CONSTRAINT [PK_Job_Inv_addless] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Job_Inv_refid] FOREIGN KEY ([JobInvId]) REFERENCES job_inv_mas(job_InvId),
	CONSTRAINT [FK_Refaddlessid] FOREIGN KEY ([AddLessId]) REFERENCES AddLess(AddlessId),
	CONSTRAINT [Chk_AorL] CHECK  (([AOrL] = '+' or [AOrL] = '-')),
)
