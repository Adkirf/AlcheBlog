import ReactMarkdown from 'react-markdown'




const ToMarkdown = ({paragraph})=>{
    return <ReactMarkdown 
                children={paragraph}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={dark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                  p({node, ...props}) {
                    const { children } = props;
              
                    if (node.children[0].tagName==="img") {
                      return (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          {children}
                        </div>
                      )
                    }
                    return (
                      <p {...props}>
                        {children}
                      </p>
                    );
                  },
                  img({node, ...props}) {
                    return (
                      <img className="w-full max-w-[300px]" {...props} />
                    )
                  }
                }}
              />
    }

export default ToMarkdown;