CREATE TABLE [dbo].[ProcessSeq]
(
    [PSeqId] [int] IDENTITY(1,1) NOT NULL primary key,
	[ProcessSeqid] [int] NOT NULL,
	[Processid] [int] NULL ,
	[Proc_seq_masid] [int] NULL,
	 CONSTRAINT [fk_proc_seq_masid] FOREIGN KEY([Proc_seq_masid])REFERENCES [dbo].[ProcessSeq_Mas] ([Proc_seq_masid]),
	 CONSTRAINT [fk_processseq_processid] FOREIGN KEY([Processid])REFERENCES [dbo].[Process] ([ProcessId])
	
	)
